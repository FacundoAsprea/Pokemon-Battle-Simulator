import { webSocket } from "@/services/websocket.service";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";
import type { swapUiUpdate, uiUpdates } from "@/types";
import {
  getPokemonByName,
  getSelectedPokemonByUserId,
  getUserById,
} from "../functions/getters";

class Game {
  async runGame() {
    const turn = await webSocket.waitForTurn();

    const { uiUpdate, newBattleState } = turn;
    console.log("LAS 2 UPDATES: ", uiUpdate);
    this.applyUiUpdate(uiUpdate[0])
      .then(() => this.applyUiUpdate(uiUpdate[1]))
      .then(() => this.runGame());
  }

  async applyUiUpdate(update: uiUpdates) {
    console.log("UPDATE: ", update);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (update.type === "swap") {
          const user = getUserById(update.user);
          const selectedPokemon = getSelectedPokemonByUserId(user.uid);
          const newSelectedPokemon = getPokemonByName(
            user,
            (update as swapUiUpdate).newSelected
          );
          useBattleText.setState({ battleText: update.message})

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

          resolve(true);
        }
      }, 3500);
    });
  }
}

const game = new Game();
export default game;
