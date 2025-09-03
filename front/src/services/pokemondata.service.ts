import axios from "axios";
import type { SpriteData } from "@/types";
import type { PokemonBattleData } from "@/game/types";

export class PokemonDataService {
  private url = "http://localhost:3200/pokemon/data/pokemon/";

  async getPokemonDataFromTeam(pokemonTeam: SpriteData[]) {
    const teamData = await Promise.all(
      pokemonTeam.map(async (selectedPokemon) => {
        const { data } = await axios.get<PokemonBattleData>(
          this.url + selectedPokemon.id.toString()
        );
        return {
          ...data,
          sprites: {
            back_default: selectedPokemon.sprites.back_default,
            front_default: selectedPokemon.sprites.front_default,
        },
        };
      })
    );
    console.log("DATA: ", teamData);
    return teamData;
  }
}
