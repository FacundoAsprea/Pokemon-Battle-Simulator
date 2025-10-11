import { webSocket } from "@/services/websocket.service";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";
import type { attackUiUpdate, swapUiUpdate, uiUpdates } from "@shared/types/uiUpdate";
import {
  getPokemonByName,
  getSelectedPokemonByUserId,
  getUserById,
} from "../functions/getters";
import { useUserHasPlayed } from "@/states/userHasPlayed/userHasPlayedState";

class Game {
  async runGame() {
    const turn = await webSocket.waitForTurn();
    console.log("TURN SE RESOLVIO: ", turn);

    const { uiUpdate, newBattleState } = turn;
    console.log("LAS 2 UPDATES: ", uiUpdate);
    await this.applyUiUpdate(uiUpdate[0]);
    await this.applyUiUpdate(uiUpdate[1]);
    console.log("NEWBATTLESTATE: ", newBattleState)
    useGlobalBattleState.setState({ globalBattleState: newBattleState })
    await this.runGame();
  }

  //es la cosa mas horrenda que hice en mi vida pero funca
  async applyUiUpdate(update: uiUpdates) {
    console.log("UPDATE: ", update);
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = getUserById(update.user);
        const selectedPokemon = getSelectedPokemonByUserId(user.uid);
        if (update.type === "swap") {
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
        } else {
          const rival = getUserById(update.user, true);
          const rivalSelectedPokemon = getSelectedPokemonByUserId(rival.uid);

          useBattleText.setState({ battleText: update.message });

          //Aplico el daño a la vida del pokemon rival
          const rivalNewTeam = rival.team.map((pokemon) =>
            pokemon.name == rivalSelectedPokemon.name
              ? {
                  ...pokemon,
                  stats: {
                    ...pokemon.stats,
                    hp: {
                      ...pokemon.stats.hp,
                      current_value:
                        pokemon.stats.hp.current_value -
                        (update as attackUiUpdate).damage,
                    },
                  },
                }
              : { ...pokemon }
          );
          console.log("NUEVA VERSION DEL EQUIPO RIVAL: ", rivalNewTeam);

          const playerNewTeam = user.team.map((pokemon) =>
            pokemon.name == selectedPokemon.name
              ? {
                  ...pokemon,
                  moveset: pokemon.moveset.map((move) =>
                    move.name == (update as attackUiUpdate).moveName
                      ? { ...move, pp: move.pp - 1 }
                      : { ...move }
                  ),
                }
              : { ...pokemon }
          );

          //Aplico los cambios al estado
          useGlobalBattleState.setState((state) => ({
            globalBattleState: {
              ...state.globalBattleState,
              usersdata: [
                { ...user, team: playerNewTeam },
                { ...rival, team: rivalNewTeam },
              ],
            },
          }));
        }

        useUserHasPlayed.setState({ userHasPlayed: false });
        resolve(true);
      }, 3500);
    });
  }
}

const game = new Game();
export default game;
