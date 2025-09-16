import { webSocket } from "@/services/websocket.service";
import type { GlobalBattleState, Swap } from "../types";
import { getPlayerData } from "../functions/getters";
import { getSelectedPokemon } from "../functions/getters";

export const swapPokemon = (
  pokemonName: string,
  globalBattleState: GlobalBattleState
) => {
  const player = getPlayerData(globalBattleState);
  const selectedPokemon = getSelectedPokemon("player", globalBattleState);

  if (selectedPokemon.name == pokemonName) return;

  const action: Swap = {
    type: "swap",
    origin: player.uid,
    from: selectedPokemon.name,
    to: pokemonName,
    message: `${player.name} ha retirado a ${selectedPokemon}. ${pokemonName} entra a la pelea!`
  };
  webSocket.sendAction(action)
};
