import mongoose, { Schema } from "mongoose";

export interface IPlayer {
  name: string;
  age: number;
  rankPoints: number;
  group: string;
}

const PlayerSchema = new Schema<IPlayer>({
  name: String,
  age: Number,
  rankPoints: Number,
  group: String,
});

const Player = mongoose.model<IPlayer>("Player", PlayerSchema);

export default Player;
