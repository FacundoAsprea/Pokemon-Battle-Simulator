import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { GetPokemonDataDTO, PokemonDataParsed } from '../dto/getPokemonDataDTO';
import { TypeData } from './types';
import types from './types.json';

@Injectable()
export class PokemonDataService {
  private pokeapiPokemonsURL = 'https://pokeapi.co/api/v2/pokemon/';

  //Info x tipo
  getType(typeName: string) {
    const type = types.find((type) => {
      return type.name == typeName.toLowerCase().trim();
    });

    if (!type) return { error: 'Not found' };
    return type;
  }

  async getPokemonData(id: string): Promise<PokemonDataParsed> {
    const { data } = await axios.get(this.pokeapiPokemonsURL.concat(id));
    const rawData = plainToInstance(GetPokemonDataDTO, data, {
      excludeExtraneousValues: true,
    });

    //Parsear tipo
    const pokemonData = {
      ...rawData,
      types: rawData.types.map(
        (type) => this.getType(type.type.name) as TypeData,
      ),
      stats: rawData.stats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })),
    };

    return pokemonData;
  }

  getAllTypesData(): TypeData[] {
    return types;
  }
}
