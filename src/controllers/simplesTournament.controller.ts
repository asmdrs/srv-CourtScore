import { Request, Response } from "express";
import SimpleTournamentService from "../services/simpleTournament.service";

class SimpleTournamentController {
  static async createTournament(req: Request, res: Response) {
    try {
      const { name, group } = req.body;
      const tournament = await SimpleTournamentService.createTournament(
        name,
        group
      );
      res.status(201).json(tournament);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateFinalWinner(req: Request, res: Response) {
    try {
      const { winner, name } = req.body;
      const tournament = await SimpleTournamentService.updateFinalWinner(
        name,
        winner
      );
      if (!tournament) {
        res.status(404).json({ error: "Torneio não encontrado" });
      } else {
        res.json(tournament);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTournament(req: Request, res: Response) {
    try {
      const { name } = req.body;
      await SimpleTournamentService.deleteTournament(name);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addTennisGameToPhase(req: Request, res: Response) {
    try {
      const { name, side, phaseName, tennisGame } = req.body;
      const tournament = await SimpleTournamentService.addTennisGameToPhase(
        name,
        side as "ladoA" | "ladoB",
        phaseName as "oitavas" | "quartas" | "semis",
        tennisGame
      );
      if (!tournament) {
        res.status(404).json({ error: "Torneio não encontrado" });
      } else {
        res.json(tournament);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTennisGameInPhase(req: Request, res: Response) {
    try {
      const { tournamentName, side, phaseName, gameIndex, updatedGameData } =
        req.body;
      const tournament = await SimpleTournamentService.updateTennisGameInPhase(
        tournamentName,
        side as "ladoA" | "ladoB",
        phaseName as "oitavas" | "quartas" | "semis",
        Number(gameIndex),
        updatedGameData
      );
      if (!tournament) {
        res.status(404).json({ error: "Torneio não encontrado" });
      } else {
        res.json(tournament);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SimpleTournamentController;
