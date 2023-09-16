
import { Model } from 'mongoose';
import TennisGame, { ITennisGame } from '../models/match.model';
import { IGameResult, ISimpleTournament, SimpleTournament } from '../models/simpleTournament.model';

class SimpleTournamentService {
  static async createTournament(champion: string): Promise<ISimpleTournament>{
    try {
      const tournament = new SimpleTournament({
        champion,
      });
      await tournament.save();
      return tournament;
    } catch (error) {
      throw new Error(`Erro ao criar novo torneio: ${(error as Error).message}`);
    }
  }

  static async updateFinalWinner(tournamentId: string, winner: string): Promise<ISimpleTournament | null> {
    try {
      const tournament = await SimpleTournament.findByIdAndUpdate(
        tournamentId,
        { 'final.winner': winner },
        { new: true }
      );
      return tournament;
    } catch (error) {
      throw new Error(`Erro ao atualizar vencedor da partida final: ${(error as Error).message}`);
    }
  }

  static async deleteTournament(tournamentId: string): Promise<void> {
    try {
      await SimpleTournament.findByIdAndRemove(tournamentId);
    } catch (error) {
      throw new Error(`Erro ao deletar torneio: ${(error as Error).message}`);
    }
  }
  
  static async addTennisGameToPhase(
    tournamentId: string,
    side: 'ladoA' | 'ladoB',
    phaseIndex: number,
    tennisGame: ITennisGame
  ): Promise<ISimpleTournament | null> {
    try {
      const TournamentModel: Model<ISimpleTournament> = SimpleTournament;

      const tournament = await TournamentModel.findById(tournamentId);

      if (!tournament) {
        throw new Error('Torneio não encontrado');
      }

      if ((side === 'ladoA' || side === 'ladoB') && phaseIndex >= 0 && phaseIndex < tournament[side].length) {
        const newGame = new TennisGame(tennisGame);
        await newGame.save();

        const gameResult: IGameResult = {
          game: newGame._id,
          winner: tennisGame.winner,
        };

        tournament[side][phaseIndex].games.push(gameResult);
        await tournament.save();
        return tournament;
      } else {
        throw new Error('Fase ou lado do torneio inválido');
      }
    } catch (error) {
      throw new Error(`Erro ao adicionar jogo de tênis à fase do torneio: ${(error as Error).message}`);
    }
  }

  static async updateTennisGameInPhase(
    tournamentId: string,
    side: 'ladoA' | 'ladoB',
    phaseIndex: number,
    gameIndex: number,
    updatedGameData: Partial<ITennisGame>
  ): Promise<ISimpleTournament | null> {
    try {
      const TournamentModel: Model<ISimpleTournament> = SimpleTournament;
0
      const tournament = await TournamentModel.findById(tournamentId);

      if (!tournament) {
        throw new Error('Torneio não encontrado');
      }

      if ((side === 'ladoA' || side === 'ladoB') && phaseIndex >= 0 && phaseIndex < tournament[side].length) {
        const phase = tournament[side][phaseIndex];
        if (gameIndex >= 0 && gameIndex < phase.games.length) {
          const gameResult = phase.games[gameIndex];
          const tennisGame = await TennisGame.findByIdAndUpdate(
            gameResult.game.toString(),
            updatedGameData,
            { new: true }
          );

          if (!tennisGame) {
            throw new Error('Jogo de tênis não encontrado');
          }

          gameResult.game = tennisGame._id;
          gameResult.winner = tennisGame.winner;
          await tournament.save();
          return tournament;
        } else {
          throw new Error('Índice de jogo inválido na fase do torneio');
        }
      } else {
        throw new Error('Fase ou lado do torneio inválido');
      }
    } catch (error) {
      throw new Error(`Erro ao atualizar jogo de tênis na fase do torneio: ${(error as Error).message}`);
    }
  }
}

export default SimpleTournamentService;
