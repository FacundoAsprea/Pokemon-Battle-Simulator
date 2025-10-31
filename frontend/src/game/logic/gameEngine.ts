import { webSocket } from "@/services/websocket.service";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";
import type {
  attackUiUpdate,
  swapUiUpdate,
  uiUpdates,
} from "@shared/types/uiUpdate";
import {
  getId,
  getPokemonByName,
  getSelectedPokemon,
  getSelectedPokemonByUserId,
  getUserById,
} from "../functions/getters";
import { useUserHasPlayed } from "@/states/userHasPlayed/userHasPlayedState";
import { capitalize } from "@/utils/functions";
import type { Attack } from "@shared/types/moves";

class Game {
  async runGame() {
    const turn = await webSocket.waitForTurn();

    const { uiUpdate, newBattleState } = turn;
    await this.applyUiUpdate(uiUpdate[0]);
    await this.applyUiUpdate(uiUpdate[1]);
    useGlobalBattleState.setState({ globalBattleState: newBattleState });
    await this.checkForPokemonFaint();
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

  skipTurnTemplate: Attack = {
    priority: 1,
    type: "attack",
    message: "",
    origin: getId(),
    move: {
      name: "skipTurn",
      power: 0,
      pp: 0,
      priority: 1,
      accuracy: 0,
      damage_class: "physical",
      type: "normal",
      target: "self",
    },
  };

  checkForPokemonFaint() {
    const rivalSelectedPokemon = getSelectedPokemon(
      "rival",
      useGlobalBattleState.getState().globalBattleState
    );
    const playerSelectedPokemon = getSelectedPokemon(
      "player",
      useGlobalBattleState.getState().globalBattleState
    );

    if (playerSelectedPokemon.stats.hp.current_value <= 0) {
      const { setBattleText } = useBattleText.getState();
      setBattleText(
        `${capitalize(
          playerSelectedPokemon.name
        )} ya no puede luchar, debes cambiar de Pokemon`
      );
    } else if (rivalSelectedPokemon.stats.hp.current_value <= 0) {
      console.log("EL POKEMON DEL RIVAL CAGO FUEGO, ENVIANDO UN TURN VACIO");
      const { setUserHasPlayed } = useUserHasPlayed.getState();
      setUserHasPlayed(true);
      //Accion sin cambios
      webSocket.sendAction(this.skipTurnTemplate);
    }
  }
}

const game = new Game();
export default game;
