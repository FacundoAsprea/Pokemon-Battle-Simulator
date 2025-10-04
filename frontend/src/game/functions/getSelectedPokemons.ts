import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { getSelectedPokemon } from "./getters";

export const getSelectedPokemonSprites = (
  user: "player" | "rival",
) => {
  if (user == "player") {
    const selectedPokemon = getSelectedPokemon("player", useGlobalBattleState.getState().globalBattleState)
    return selectedPokemon.sprites.gif_back;
  }

  const selectedPokemon = getSelectedPokemon("rival", useGlobalBattleState.getState().globalBattleState)
  return selectedPokemon.sprites.gif_default;
};
