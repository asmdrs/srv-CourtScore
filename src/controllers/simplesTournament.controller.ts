import { Request, Response } from 'express';
import SimpleTournamentService from '../services/simpleTournament.service';

class SimpleTournamentController {
  static async createTournament(req: Request, res: Response) {
    try {
      const { champion } = req.body;
      const tournament = await SimpleTournamentService.createTournament(champion);
      res.status(201).json(tournament);
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateFinalWinner(req: Request, res: Response) {
    try {
      const { tournamentId } = req.params;
      const { winner } = req.body;
      const tournament = await SimpleTournamentService.updateFinalWinner(tournamentId, winner);
      if (!tournament) {
        res.status(404).json({ error: 'Torneio não encontrado' });
      } else {
        res.json(tournament);
      }
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTournament(req: Request, res: Response) {
    try {
      const { tournamentId } = req.params;
      await SimpleTournamentService.deleteTournament(tournamentId);
      res.status(204).send();
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async addTennisGameToPhase(req: Request, res: Response) {
    try {
      const { tournamentId, side, phaseIndex } = req.params;
      const tennisGame = req.body;
      const tournament = await SimpleTournamentService.addTennisGameToPhase(
        tournamentId,
        side as 'ladoA' | 'ladoB',
        Number(phaseIndex),
        tennisGame
      );
      if (!tournament) {
        res.status(404).json({ error: 'Torneio não encontrado' });
      } else {
        res.json(tournament);
      }
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTennisGameInPhase(req: Request, res: Response) {
    try {
      const { tournamentId, side, phaseIndex, gameIndex } = req.params;
      const updatedGameData = req.body;
      const tournament = await SimpleTournamentService.updateTennisGameInPhase(
        tournamentId,
        side as 'ladoA' | 'ladoB',
        Number(phaseIndex),
        Number(gameIndex),
        updatedGameData
      );
      if (!tournament) {
        res.status(404).json({ error: 'Torneio não encontrado' });
      } else {
        res.json(tournament);
      }
    } catch (error:any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SimpleTournamentController;
