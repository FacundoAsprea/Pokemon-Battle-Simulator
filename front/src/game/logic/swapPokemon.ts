import { webSocket } from "@/services/websocket.service";
import type { Swap } from "../types";
import { getPlayerData } from "../functions/getters";
import { getSelectedPokemon } from "../functions/getters";
import { capitalize } from "@/utils/functions";

export const swapPokemon = (
  pokemonName: string,
) => {
  const player = getPlayerData();
  const selectedPokemon = getSelectedPokemon("player");

  if (selectedPokemon.name == pokemonName) return false

  const action: Swap = {
    type: "swap",
    origin: player.uid,
    from: selectedPokemon.name,
    to: pokemonName,
    message: `${player.name} ha retirado a ${capitalize(selectedPokemon.name)}. ${capitalize(pokemonName)} entra a la pelea!`
  };
  webSocket.sendAction(action)
  return true
};
