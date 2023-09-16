import mongoose, { Schema, Document } from 'mongoose';
import TennisGame from './match.model';

export interface IGameResult {
  game: typeof TennisGame;
  winner: string;
}

interface IPhase {
  games: IGameResult[];
}

export interface ISimpleTournament extends Document {
  ladoA: IPhase[];
  ladoB: IPhase[];
  final?: IGameResult;
  champion?: string;
  name?: String;
}

const GameResultSchema = new Schema<IGameResult>({
  game: {
    type: Schema.Types.ObjectId,
    ref: 'TennisGame',
  },
  winner: String,
});

const PhaseSchema = new Schema<IPhase>({
  games: [GameResultSchema],
});

const SimpleTournamentSchema = new Schema<ISimpleTournament>({
  ladoA: [PhaseSchema],
  ladoB: [PhaseSchema],
  final: GameResultSchema,
  champion: String,
  name: String,
});

const SimpleTournament = mongoose.model<ISimpleTournament>('SimpleTournament', SimpleTournamentSchema);

export { SimpleTournament };
