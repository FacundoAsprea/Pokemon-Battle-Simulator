import { webSocket } from "@/services/websocket.service";
import type { Attack, MoveData } from "../types";
import { getPlayerData } from "../functions/getters";
import { getSelectedPokemon } from "../functions/getters";
import { capitalize } from "@/utils/functions";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

export const executeAttack = (
  attack: MoveData
) => {
  const player = getPlayerData(useGlobalBattleState.getState().globalBattleState)
  const selectedPokemon = getSelectedPokemon("player");

  const action: Attack= {
    type: "attack",
    origin: player.uid,
    message: `${capitalize(selectedPokemon.name)} va a usar ${attack.name}`,
    move: attack
  };
  webSocket.sendAction(action)
};
