import type { GlobalBattleState, UserBattleState } from "../types";

export const getPlayerData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  console.log("EJECUTANDO GETPLAYERDATA CON LA UID: ", playerUID);
  return globalBattleState.usersdata.find(
    (user) => user.uid == playerUID
  ) as UserBattleState;
};

export const getRivalData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  console.log("EJECUTANDO GETRIVALDATA CON LA UID: ", playerUID);
  return globalBattleState.usersdata.find(
    (user) => user.uid != playerUID
  ) as UserBattleState;
};

export const getSelectedPokemon = (
  user: "player" | "rival",
  globalBattleState: GlobalBattleState
) => {
  const uid = localStorage.getItem("uid");
  console.log("LA UID ES: ", uid);
  console.log("EL ESTADO GLOBAL: ", globalBattleState);

  if (user == "player") {
    const player = globalBattleState.usersdata.find((user) => user.uid == uid);
    const selectedPokemon = player!.team.find(
      (pokemon) => pokemon.selected == true
    );
    return selectedPokemon!;
  }

  const rival = globalBattleState.usersdata.find((user) => user.uid != uid);
  const selectedPokemon = rival!.team.find(
    (pokemon) => pokemon.selected == true
  );
  return selectedPokemon!;
};
