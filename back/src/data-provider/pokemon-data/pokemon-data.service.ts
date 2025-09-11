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

    //Parsear tipo y stats
    //PASAR A UNA PIPE EN UN FUTURO
    const parsedStats = {
      hp: {},
      attack: {},
      defense: {},
      special_attack: {},
      special_defense: {},
      speed: {},
    };
    rawData.stats.forEach((stat) => {
      parsedStats[stat.stat.name] = {
        base_stat: stat.base_stat,
        actual_value: stat.base_stat,
      };
    });
    console.log(parsedStats);
    const pokemonData = {
      ...rawData,
      types: rawData.types.map(
        (type) => this.getType(type.type.name) as TypeData,
      ),
      stats: parsedStats,
      selected: false,
    };

    return pokemonData as PokemonDataParsed;
  }

  getAllTypesData(): TypeData[] {
    return types;
  }
}
