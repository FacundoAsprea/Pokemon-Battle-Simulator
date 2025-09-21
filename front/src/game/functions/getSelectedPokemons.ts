
import { getSelectedPokemon } from "./getters";

export const getSelectedPokemonSprites = (
  user: "player" | "rival",
) => {
  if (user == "player") {
    const selectedPokemon = getSelectedPokemon("player")
    return selectedPokemon.sprites.gif_back;
  }

  const selectedPokemon = getSelectedPokemon("rival")
  return selectedPokemon.sprites.gif_default;
};
