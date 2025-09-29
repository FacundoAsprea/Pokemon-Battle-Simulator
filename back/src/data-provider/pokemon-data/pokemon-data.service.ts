import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { GetPokemonDataDTO, PokemonDataParsed } from '../dto/getPokemonDataDTO';
import { TypeData } from './types';
import types from './data/types.json';
import movesets from './data/movesets.json';
import movelist from './data/moves.json';
import { MoveData } from '../dto/getPokemonDataDTO';

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
      parsedStats[stat.stat.name.replace('-', '_')] = {
        base_stat: stat.base_stat,
        current_value: stat.base_stat,
      };
    });

    //OBTENER MOVESET COMPLETO
    const movenames: string[] = movesets[rawData.name.toLowerCase()];
    const moveset: MoveData[] = [];
    for (let i = 0; i != 4; i++) {
      const move = movelist[movenames[i] as keyof typeof movelist];
      const parsedMove: MoveData = {
        priority: move.priority,
        accuracy: typeof move.accuracy == 'boolean' ? 100 : move.accuracy,
        name: move.name,
        power: move.basePower,
        pp: move.pp,
        damage_class: move.category.toLowerCase() as
          | 'physical'
          | 'status'
          | 'special',
        type: move.type.toLowerCase(),
      };

      moveset.push(parsedMove);
    }

    const pokemonData = {
      ...rawData,
      types: rawData.types.map(
        (type) => this.getType(type.type.name) as TypeData,
      ),
      stats: parsedStats,
      selected: false,
      moveset: moveset,
    };

    return pokemonData as PokemonDataParsed;
  }

  getAllTypesData(): TypeData[] {
    return types;
  }
}
