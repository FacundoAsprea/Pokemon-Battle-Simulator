import type { GlobalBattleState } from "../types";

export const getSelectedPokemon = (user: "player" | "rival", globalBattleState: GlobalBattleState) => {
    const uid = localStorage.getItem("uid")
    console.log("LA UID ES: ", uid)
    console.log("EL ESTADO GLOBAL: ", globalBattleState)

    if (user == "player") {
        const player = globalBattleState.usersdata.find(user => user.uid == uid)
        const selectedPokemon = player!.team.find(pokemon => pokemon.selected == true)
        return selectedPokemon!.sprites.back_default
    }

    const rival = globalBattleState.usersdata.find(user => user.uid != uid)
    const selectedPokemon = rival!.team.find(pokemon => pokemon.selected == true)
    return selectedPokemon!.sprites.front_default
}