import express from 'express';
import { createTennisGame, getAllTennisGames, getTennisGameById, updateTennisGameById } from '../services/game.service';
const router = express.Router();

//CREATE
router.post('/games', async (req, res) => {
    try {
      const gameData = req.body;
      const newGame = await createTennisGame(gameData);
      res.status(201).json(newGame);
    } catch (error:any) {
      res.status(500).json({ error: 'Erro ao criar novo jogo: ' + error.message });
    }
  });
  
  //LIST
  router.get('/games', async (req, res) => {
    try {
      const games = await getAllTennisGames();
      res.status(200).json(games);
    } catch (error:any) {
      res.status(500).json({ error: 'Erro ao buscar jogos de tênis: ' + error.message });
    }
  });
  
  //FIND
  router.get('/games/:gameId', async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const game = await getTennisGameById(gameId);
      res.status(200).json(game);
    } catch (error: any) {
      res.status(500).json({ error: 'Erro ao buscar jogo de tênis por ID: ' + error.message });
    }
  });
  
  //UPDATE
  router.put('/games/:gameId', async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const updatedGameData = req.body;
      const updatedGame = await updateTennisGameById(gameId, updatedGameData);
      res.status(200).json(updatedGame);
    } catch (error:any) {
      res.status(500).json({ error: 'Erro ao atualizar jogo de tênis por ID: ' + error.message });
    }
  });

export { router };
