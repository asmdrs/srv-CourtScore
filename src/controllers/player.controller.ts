import { Request, Response } from "express";
import PlayerService from "../services/player.service";

class PlayerController {
  static async createPlayer(req: Request, res: Response) {
    try {
      const { playerData } = req.body;
      const newPlayer = await PlayerService.createPlayer(playerData);
      res.status(201).json(newPlayer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPlayersByGroup(req: Request, res: Response) {
    try {
      const { group } = req.body;
      const playersByGroup = await PlayerService.getPlayerByGroup(group);
      if (!playersByGroup) {
        res.status(204).send();
      } else {
        res.json(playersByGroup);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatePlayer(req: Request, res: Response) {
    try {
      const { playerName, updatedPlayerData } = req.body;
      const updatedPlayer = await PlayerService.updatePlayer(
        playerName,
        updatedPlayerData
      );
      if (!updatedPlayer) {
        res.status(404).json({ error: "Torneio não encontrado" });
      } else {
        res.json(updatedPlayer);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deletePlayer(req: Request, res: Response) {
    try {
      const { playerName } = req.body;
      await PlayerService.deletePlayer(playerName);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PlayerController;
