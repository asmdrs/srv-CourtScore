import mongoose, { Schema, Document } from 'mongoose';

interface ISetScore {
  player1Score: number;
  player2Score: number;
}

export interface ITennisGame extends Document {
  player1: string;
  player2: string;
  sets: ISetScore[];
  winner: string;
}

const TennisGameSchema = new Schema<ITennisGame>({
  player1: String,
  player2: String,
  sets: [
    {
      player1Score: Number,
      player2Score: Number,
    },
  ],
  winner: String
});

const TennisGame = mongoose.model<ITennisGame>('TennisGame', TennisGameSchema);

export default TennisGame;