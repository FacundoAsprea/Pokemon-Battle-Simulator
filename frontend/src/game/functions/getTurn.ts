import type { GlobalBattleState } from "@shared/types/states";

export const isPlayersTurn = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  return globalBattleState.battledata.turn == playerUID ? true : false;
}