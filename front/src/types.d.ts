import type { GlobalBattleState, Type } from "./game/types";

export interface TurnResponse {
  uiUpdate: uiUpdates[];
  newBattleState: GlobalBattleState;
}
export type uiUpdates = swapUiUpdate | attackUiUpdate;
interface uiUpdate {
  user: string;
  message: string;
  type: "swap" | "attack";
}
export interface swapUiUpdate extends uiUpdate {
  newSelected: string;
}
export interface attackUiUpdate extends uiUpdate {
  damage: number;
  animation: Type;
  moveName: string;
}

export interface SpriteData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: string[];
}

export interface PlayerData {
  name: string;
}
