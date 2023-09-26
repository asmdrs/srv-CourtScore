import TennisGame, { ITennisGame } from "../models/match.model";
import {
  IGameResult,
  ISimpleTournament,
  SimpleTournament,
} from "../models/simpleTournament.model";
import { tennisGame } from "../models/tennisGame.model";
import PlayerService from "./player.service";

class SimpleTournamentService {
  static async createTournament(
    name: string,
    group: string
  ): Promise<ISimpleTournament> {
    try {
      const alredyExists = await SimpleTournament.findOne({ name: name });
      if (alredyExists) {
        throw new Error("Torneio já existe");
      }

      const tournament = new SimpleTournament({
        name: name,
        group: group,
        ladoA: [{ oitavas: [], quartas: [], semis: [] }],
        ladoB: [{ oitavas: [], quartas: [], semis: [] }],
      });
      await tournament.save();

      return tournament;
    } catch (error) {
      throw new Error(
        `Erro ao criar novo torneio: ${(error as Error).message}`
      );
    }
  }

  static async updateFinalWinner(
    name: string,
    winner: string
  ): Promise<ISimpleTournament | null> {
    try {
      let tournament = await SimpleTournament.findOne({ name: name });

      if (!tournament) {
        throw new Error("Torneio não encontrado");
      }

      tournament.set({ winner: winner });
      return tournament;
    } catch (error) {
      throw new Error(
        `Erro ao atualizar vencedor da partida final: ${
          (error as Error).message
        }`
      );
    }
  }

  static async deleteTournament(tournamentName: string) {
    try {
      await SimpleTournament.deleteOne({ name: tournamentName });
    } catch (error) {
      throw new Error(`Erro ao deletar torneio: ${(error as Error).message}`);
    }
  }

  static async addTennisGameToPhase(
    tournamentName: string,
    side: "ladoA" | "ladoB",
    phaseName: "oitavas" | "quartas" | "semis",
    tennisGame: tennisGame
  ): Promise<ISimpleTournament | null> {
    try {
      const tournament = await SimpleTournament.findOne({
        name: tournamentName,
      });

      if (!tournament) {
        throw new Error("Torneio não encontrado");
      }

      if (side === "ladoA" || side === "ladoB") {
        const player1 = await PlayerService.getPlayerByNameAndGroup(
          tennisGame.player1,
          tournament.group
        );
        const player2 = await PlayerService.getPlayerByNameAndGroup(
          tennisGame.player2,
          tournament.group
        );

        if (!player1 || !player2) {
          throw new Error("Jogador não encontrado");
        }

        const newGame: ITennisGame = new TennisGame({
          player1: player1._id,
          player2: player2._id,
          sets: tennisGame.sets,
          winner: tennisGame.winner,
        });

        if (newGame.winner == player1.name) {
          player1.rankPoints += 10;
        }
        if (newGame.winner == player2.name) {
          player2.rankPoints += 10;
        }

        await newGame.save();

        const gameResult: IGameResult = {
          game: newGame._id,
          winner: tennisGame.winner,
        };

        const phase = tournament[side].find((phase) => phase[phaseName]);
        if (!phase) {
          throw new Error(`Fase '${phaseName}' não encontrada`);
        }

        phase[phaseName].push(gameResult);
        await tournament.save();
        return tournament;
      } else {
        throw new Error("Fase ou lado do torneio inválido");
      }
    } catch (error) {
      throw new Error(
        `Erro ao adicionar jogo de tênis à fase do torneio: ${
          (error as Error).message
        }`
      );
    }
  }

  static async updateTennisGameInPhase(
    tournamentName: string,
    side: "ladoA" | "ladoB",
    phaseName: "oitavas" | "quartas" | "semis",
    gameIndex: number,
    updatedGameData: Partial<ITennisGame>
  ): Promise<ISimpleTournament | null> {
    try {
      const tournament = await SimpleTournament.findOne({
        name: tournamentName,
      });

      if (!tournament) {
        throw new Error("Torneio não encontrado");
      }

      if (side === "ladoA" || side === "ladoB") {
        const phase = tournament[side].find((phase) => phase[phaseName]);

        if (!phase) {
          throw new Error(`Fase '${phaseName}' não encontrada`);
        }

        if (gameIndex >= 0 && gameIndex < phase[phaseName].length) {
          const gameResult = phase[phaseName][gameIndex];
          const updatedGame = Object.assign(
            {},
            gameResult.game,
            updatedGameData
          );

          phase[phaseName][gameIndex].game = updatedGame;
          await tournament.save();
          return tournament;
        } else {
          throw new Error("Índice de jogo inválido na fase do torneio");
        }
      } else {
        throw new Error("Lado do torneio inválido");
      }
    } catch (error) {
      throw new Error(
        `Erro ao atualizar jogo de tênis na fase do torneio: ${
          (error as Error).message
        }`
      );
    }
  }
}

export default SimpleTournamentService;
