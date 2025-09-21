import type { UserBattleState, GlobalBattleState } from "../../game/types";

export interface GlobalBattleStateType {
  globalBattleState: GlobalBattleState;
  setGlobalBattleState: (newState: GlobalBattleState) => void
}
export interface LocalBattleStateType {
  localBattleState: UserBattleState;
  setLocalBattleState: (newState: UserBattleState) => void
}