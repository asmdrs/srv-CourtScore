import { ISetScore } from "./match.model";

export interface tennisGame {
  player1: string;
  player2: string;
  sets: ISetScore[];
  winner: string;
}
