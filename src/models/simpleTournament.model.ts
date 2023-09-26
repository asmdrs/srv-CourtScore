import mongoose, { Schema, Document } from "mongoose";
import { ITennisGame } from "./match.model";

export interface IGameResult {
  game: ITennisGame;
  winner: string;
}

interface IPhase {
  oitavas: IGameResult[];
  quartas: IGameResult[];
  semis: IGameResult[];
}

export interface ISimpleTournament extends Document {
  ladoA: IPhase[];
  ladoB: IPhase[];
  final?: IGameResult;
  champion?: string;
  name: string;
  group: string;
}

const GameResultSchema = new Schema<IGameResult>({
  game: {
    type: Schema.Types.ObjectId,
    ref: "TennisGame",
  },
  winner: String,
});

const PhaseSchema = new Schema<IPhase>({
  oitavas: [GameResultSchema],
  quartas: [GameResultSchema],
  semis: [GameResultSchema],
});

const SimpleTournamentSchema = new Schema<ISimpleTournament>({
  ladoA: [PhaseSchema],
  ladoB: [PhaseSchema],
  final: GameResultSchema,
  champion: String,
  name: String,
  group: String,
});

const SimpleTournament = mongoose.model<ISimpleTournament>(
  "SimpleTournament",
  SimpleTournamentSchema
);

export { SimpleTournament };
