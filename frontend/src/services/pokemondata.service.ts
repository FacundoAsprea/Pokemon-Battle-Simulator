import axios from "axios";
import type { SpriteData } from "@/types";
import type { PokemonBattleData } from "@shared/types/battledata"

export class PokemonDataService {
  private URL = "http://localhost:3200/pokemon/data/pokemon/";
  private gifURL = "http://localhost:3200/pokemon/sprites/gif/"

  async getPokemonDataFromTeam(pokemonTeam: SpriteData[]) {
    const teamData = await Promise.all(
      pokemonTeam.map(async (selectedPokemon) => {
        const { data } = await axios.get<PokemonBattleData>(
          this.URL + selectedPokemon.id.toString()
        );
        const gifs = await axios.get<SpriteData>(
          this.gifURL + selectedPokemon.id.toString()
        )
        return {
          ...data,
          sprites: {
            back_default: selectedPokemon.sprites.back_default,
            front_default: selectedPokemon.sprites.front_default,
            gif_default: gifs.data.sprites.front_default,
            gif_back: gifs.data.sprites.back_default
        },
        };
      })
    );
    return teamData;
  }
}
