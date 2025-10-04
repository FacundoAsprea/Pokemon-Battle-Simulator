import type { GlobalBattleState } from "./game/types";

export interface TurnResponse {
  uiUpdate: uiUpdates[];
  newBattleState: GlobalBattleState;
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
