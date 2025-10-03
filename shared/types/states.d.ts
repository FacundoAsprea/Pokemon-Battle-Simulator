import { PokemonBattleData } from "./battledata";

export interface GlobalBattleState {
  usersdata: UserBattleState[];
  battledata: {
    turn: string;
  };
}

export interface UserBattleState {
  team: PokemonBattleData[];
  name: string;
  uid: string;
  hasPlayed: false;
}