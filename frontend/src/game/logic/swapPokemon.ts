import { webSocket } from "@/services/websocket.service";
import type { Swap } from "@shared/types/moves";
import { getPlayerData } from "../functions/getters";
import { getSelectedPokemon } from "../functions/getters";
import { capitalize } from "@/utils/functions";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

export const swapPokemon = (pokemonName: string) => {
  const player = getPlayerData(useGlobalBattleState.getState().globalBattleState);
  const selectedPokemon = getSelectedPokemon("player", useGlobalBattleState.getState().globalBattleState);

  if (selectedPokemon.name == pokemonName) return false;

  const action: Swap = {
    priority: 0.5,
    type: "swap",
    origin: player.uid,
    from: selectedPokemon.name,
    to: pokemonName,
    message: `${player.name} ha retirado a ${capitalize(
      selectedPokemon.name
    )}. ${capitalize(pokemonName)} entra a la pelea!`,
  };
  webSocket.sendAction(action);
  return true;
};
