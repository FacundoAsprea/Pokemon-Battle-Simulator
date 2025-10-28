import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import type {
  GlobalBattleState,
  UserBattleState,
} from "@shared/types/states";

export const getId = () => {
  const id = localStorage.getItem("uid")
  if (!id) throw new Error("USERUID DOESNT EXIST")
  return id
}

export const getUserById = (id: string, getRival?: boolean) => {
  const { globalBattleState } = useGlobalBattleState.getState();
  const user = globalBattleState.usersdata.find((user) => getRival ? user.uid != id : user.uid == id);
  if (!user) throw new Error("ERROR EN getUserById");
  return user;
};

export const getSelectedPokemonByUserId = (id: string) => {
  const pokemon = getUserById(id).team.find(
    (pokemon) => pokemon.selected == true
  );
  if (!pokemon) throw new Error(`ERROR EN getSelectedPokemonByUserId`);
  return pokemon;
};

export const getPokemonByName = (
  userRef: UserBattleState,
  pokemonName: string
) => {
  const pokemon = userRef.team.find((pokemon) => pokemon.name == pokemonName);
  if (!pokemon) throw new Error("ERROR EN getPokemonByName");
  return pokemon;
};

export const getPlayerData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  const player = globalBattleState.usersdata.find(
    (user) => user.uid == playerUID
  );
  if (!player) throw new Error("ERROR EN getPlayerData");
  return player;
};

export const getRivalData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  const rival = globalBattleState.usersdata.find(
    (user) => user.uid != playerUID
  );
  if (!rival) throw new Error("ERROR EN getRivalData");
  return rival
};

export const getSelectedPokemon = (
  user: "player" | "rival",
  globalBattleState: GlobalBattleState
) => {
  const userData =
    user == "player"
      ? getPlayerData(globalBattleState)
      : getRivalData(globalBattleState);

  const selectedPokemon = userData.team.find(
    (pokemon) => pokemon.selected == true
  );
  return selectedPokemon!;
};
