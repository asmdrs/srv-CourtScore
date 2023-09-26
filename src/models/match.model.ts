import mongoose, { Schema, Document } from "mongoose";
import { IPlayer } from "./player.model";

export interface ISetScore {
  player1Score: number;
  player2Score: number;
}

export interface ITennisGame extends Document {
  player1: IPlayer;
  player2: IPlayer;
  sets: ISetScore[];
  winner: string;
}

const TennisGameSchema = new Schema<ITennisGame>({
  player1: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
  sets: [
    {
      player1Score: Number,
      player2Score: Number,
    },
  ],
  winner: String,
});

const TennisGame = mongoose.model<ITennisGame>("TennisGame", TennisGameSchema);

export default TennisGame;
