import type { GlobalBattleState } from "./game/types";

export interface TurnResponse {
  uiUpdate: uiUpdates[],
  newBattleState: GlobalBattleState
}
export type uiUpdates = swapUiUpdate | attackUiUpdate;
interface uiUpdate {
  user: string;
  message: string;
  type: 'swap' | 'attack' | 'status';
}
export interface swapUiUpdate extends uiUpdate {
  newSelected: string;
}
export interface attackUiUpdate extends uiUpdate {
  objective: string;
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
  name: string
}