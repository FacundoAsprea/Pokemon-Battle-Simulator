import { webSocket } from "@/services/websocket.service";
import type { Attack } from "@shared/types/moves";
import type { MoveData } from "@shared/types/moves";
import { getPlayerData } from "../functions/getters";
import { getSelectedPokemon } from "../functions/getters";
import { capitalize } from "@/utils/functions";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

export const executeAttack = (attack: MoveData) => {
  const player = getPlayerData(
    useGlobalBattleState.getState().globalBattleState
  );
  const selectedPokemon = getSelectedPokemon(
    "player",
    useGlobalBattleState.getState().globalBattleState
  );

  const action: Attack = {
    priority: attack.priority,
    type: "attack",
    origin: player.uid,
    message: `${capitalize(selectedPokemon.name)} va a usar ${attack.name}`,
    move: attack,
  };
  webSocket.sendAction(action);
};
