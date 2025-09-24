import { webSocket } from "@/services/websocket.service";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";
import type { swapUiUpdate, uiUpdates } from "@/types";
import {
  getPokemonByName,
  getSelectedPokemonByUserId,
  getUserById,
} from "../functions/getters";
import { useUserHasPlayed } from "@/states/userHasPlayed/userHasPlayedState";

class Game {
  async runGame() {
    const turn = await webSocket.waitForTurn();
    console.log("TURN SE RESOLVIO: ", turn)

    const { uiUpdate } = turn;
    console.log("LAS 2 UPDATES: ", uiUpdate);
    await this.applyUiUpdate(uiUpdate[0]);
    await this.applyUiUpdate(uiUpdate[1]);
    await this.runGame();
  }

  async applyUiUpdate(update: uiUpdates) {
    console.log("UPDATE: ", update);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (update.type === "swap") {
          const user = getUserById(
            update.user,
            useGlobalBattleState.getState().globalBattleState
          );
          const selectedPokemon = getSelectedPokemonByUserId(
            user.uid,
            useGlobalBattleState.getState().globalBattleState
          );
          const newSelectedPokemon = getPokemonByName(
            user,
            (update as swapUiUpdate).newSelected
          );
          useBattleText.setState({ battleText: update.message });

          //Creo una version con los cambios aplicados
          const newTeam = user.team.map((pokemon) => {
            if (pokemon.name === selectedPokemon.name) {
              return { ...pokemon, selected: false };
            }
            if (pokemon.name === newSelectedPokemon.name) {
              return { ...pokemon, selected: true };
            }
            return pokemon;
          });
          console.log("NUEVA VERSION DEL EQUIPO: ", newTeam);

          //Aplico los cambios al estado
          useGlobalBattleState.setState((state) => ({
            globalBattleState: {
              ...state.globalBattleState,
              usersdata: state.globalBattleState.usersdata.map((userdata) =>
                userdata.uid === user.uid
                  ? { ...userdata, team: newTeam }
                  : userdata
              ),
            },
          }));

          useUserHasPlayed.setState({ userHasPlayed: false });

          resolve(true);
        }
      }, 3500);
    });
  }
}

const game = new Game();
export default game;
