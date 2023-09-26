import Player, { IPlayer } from "../models/player.model";

class PlayerService {
  static async createPlayer(playerData: IPlayer) {
    try {
      const alredyExists = await Player.findOne({ name: playerData.name });
      if (alredyExists) {
        throw new Error("Jogador já existe");
      }

      const newPlayer = new Player(playerData);
      await newPlayer.save();
      return "Jogador salvo";
    } catch (error: any) {
      throw new Error("Erro ao criar novo jogador: " + error.message);
    }
  }

  static async getAllPlayers() {
    try {
      const players = await Player.find();
      return players;
    } catch (error: any) {
      throw new Error("Erro ao buscar jogadores: " + error.message);
    }
  }

  static async getPlayerByGroup(group: string) {
    try {
      const playersByGroup = await Player.find({ group: group });
      return playersByGroup;
    } catch (error) {
      throw new Error(
        "Erro ao buscar jogadores do grupo: " + (error as Error).message
      );
    }
  }

  static async updatePlayer(
    playerName: string,
    updatedPlayerData: Partial<IPlayer>
  ) {
    try {
      let player = await Player.findOne({ name: playerName });
      if (!player) {
        throw new Error("Player não encontrado");
      }

      if (updatedPlayerData.name !== undefined) {
        player.set({ name: updatedPlayerData.name });
      }
      if (updatedPlayerData.age !== undefined) {
        player.set({ age: updatedPlayerData.age });
      }
      if (updatedPlayerData.rankPoints !== undefined) {
        player.set({ rankPoints: updatedPlayerData.rankPoints });
      }

      await player.save();
      return player;
    } catch (error) {
      throw new Error("Erro ao atualizar player" + (error as Error).message);
    }
  }

  static async deletePlayer(playerName: string) {
    try {
      await Player.deleteOne({ name: playerName });
    } catch (error) {
      throw new Error("Erro ao deletar player" + (error as Error).message);
    }
  }

  static async getPlayerByNameAndGroup(name: string, group: string) {
    try {
      const player = await Player.findOne({ name: name, group: group });
      return player;
    } catch (error) {
      throw new Error("Erro ao encontrar jogador: " + (error as Error).message);
    }
  }

  static async addRankPoints(rankPoints: number, playerName: string) {
    try {
      const player = await Player.findOne({ name: playerName });
      if (!player) {
        throw new Error("Player não encontrado");
      }
      player.rankPoints += rankPoints;
      await player.save();
      return player;
    } catch (error) {
      throw new Error(
        "Erro ao adicionar rankPoints: " + (error as Error).message
      );
    }
  }
}

export default PlayerService;
