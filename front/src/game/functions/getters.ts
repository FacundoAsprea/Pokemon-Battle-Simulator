import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import type {
  GlobalBattleState,
  PokemonBattleData,
  UserBattleState,
} from "../types";

export const getUserById = (id: string, globalBattleState: GlobalBattleState) => {
  return globalBattleState.usersdata.find(
    (user) => user.uid == id
  ) as UserBattleState;
};

export const getSelectedPokemonByUserId = (id: string, globalBattleState: GlobalBattleState) => {
  return getUserById(id, globalBattleState).team.find(
    (pokemon) => pokemon.selected == true
  ) as PokemonBattleData;
};

export const getPokemonByName = (
  userRef: UserBattleState,
  pokemonName: string,
) => {
  return userRef.team.find(
    (pokemon) => pokemon.name == pokemonName
  ) as PokemonBattleData;
};

export const getPlayerData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  return globalBattleState.usersdata.find(
    (user) => user.uid == playerUID
  ) as UserBattleState;
};

export const getRivalData = (globalBattleState: GlobalBattleState) => {
  const playerUID = localStorage.getItem("uid");
  return globalBattleState.usersdata.find(
    (user) => user.uid != playerUID
  ) as UserBattleState;
};

export const getSelectedPokemon = (user: "player" | "rival") => {
  const { globalBattleState } = useGlobalBattleState.getState()

  const userData = user == "player" ? getPlayerData(globalBattleState) : getRivalData(globalBattleState)

  const selectedPokemon = userData.team.find(
    (pokemon) => pokemon.selected == true
  );
  return selectedPokemon!;
};
