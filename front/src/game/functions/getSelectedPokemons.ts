import type { GlobalBattleState } from "../types";

export const getSelectedPokemonSprites = (
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
    return selectedPokemon!.sprites.gif_back;
  }

  const rival = globalBattleState.usersdata.find((user) => user.uid != uid);
  const selectedPokemon = rival!.team.find(
    (pokemon) => pokemon.selected == true
  );
  return selectedPokemon!.sprites.gif_default;
};
