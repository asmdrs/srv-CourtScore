import TennisGame, { ITennisGame } from '../models/match.model';

//CREATE TENNIS GAME
export const createTennisGame = async (gameData: ITennisGame) => {
  try {
    const newGame = new TennisGame(gameData);
    await newGame.save();
    return newGame;
  } catch (error: any) {
    throw new Error('Erro ao criar novo jogo: ' + (error as Error).message);
  }
};

//LIST
export const getAllTennisGames = async () => {
  try {
    const games = await TennisGame.find();
    return games;
  } catch (error) {
    throw new Error('Erro ao buscar jogos de tênis: ' + (error as Error).message);
  }
};

//FIND BY ID
export const getTennisGameById = async (gameId: string) => {
  try {
    const game = await TennisGame.findById(gameId);
    if (!game) {
      throw new Error('Jogo de tênis não encontrado');
    }
    return game;
  } catch (error) {
    throw new Error('Erro ao buscar jogo de tênis por ID: ' + (error as Error).message);
  }
};

//UPDATE BY ID
export const updateTennisGameById = async (gameId: string, updatedGameData: Partial<ITennisGame>) => {
  try {
    const game = await TennisGame.findByIdAndUpdate(gameId, updatedGameData, { new: true });
    if (!game) {
      throw new Error('Jogo de tênis não encontrado');
    }
    return game;
  } catch (error) {
    throw new Error('Erro ao atualizar jogo de tênis por ID: ' + (error as Error).message);
  }
};
