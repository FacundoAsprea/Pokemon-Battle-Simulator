import type { GlobalBattleState } from "../types";

export const getPlayerData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  console.log("EJECUTANDO GETPLAYERDATA CON LA UID: ", playerUID);
  return globalBattleState.usersdata.find((user) => user.uid == playerUID);
};

export const getRivalData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  console.log("EJECUTANDO GETRIVALDATA CON LA UID: ", playerUID);
  return globalBattleState.usersdata.find((user) => user.uid != playerUID);
};
