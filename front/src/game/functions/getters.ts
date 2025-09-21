import type {
  PokemonBattleData,
  UserBattleState,
} from "../types";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

export const getUserById = (id: string) => {
  const { globalBattleState } = useGlobalBattleState.getState();
  return globalBattleState.usersdata.find(
    (user) => user.uid == id
  ) as UserBattleState;
};

export const getSelectedPokemonByUserId = (id: string) => {
  return getUserById(id).team.find(
    (pokemon) => pokemon.selected == true
  ) as PokemonBattleData;
};

export const getPokemonByName = (
  userRef: UserBattleState,
  pokemonName: string
) => {
  return userRef.team.find(
    (pokemon) => pokemon.name == pokemonName
  ) as PokemonBattleData;
};

export const getPlayerData = () => {
  const { globalBattleState } = useGlobalBattleState.getState();
  const playerUID = localStorage.getItem("uid");
  return globalBattleState.usersdata.find(
    (user) => user.uid == playerUID
  ) as UserBattleState;
};

export const getRivalData = () => {
  const { globalBattleState } = useGlobalBattleState.getState();
  const playerUID = localStorage.getItem("uid");
  return globalBattleState.usersdata.find(
    (user) => user.uid != playerUID
  ) as UserBattleState;
};

export const getSelectedPokemon = (user: "player" | "rival") => {
  const { globalBattleState } = useGlobalBattleState.getState();
  const uid = localStorage.getItem("uid");

  if (user == "player") {
    const player = globalBattleState.usersdata.find((user) => user.uid == uid);
    const selectedPokemon = player!.team.find(
      (pokemon) => pokemon.selected == true
    );
    return selectedPokemon!;
  }

  const rival = globalBattleState.usersdata.find((user) => user.uid != uid);
  const selectedPokemon = rival!.team.find(
    (pokemon) => pokemon.selected == true
  );
  return selectedPokemon!;
};
