import { Expose } from 'class-transformer';
import { TypeData } from '../pokemon-data/types';
import type { StatResponse, TypeResponse } from '../pokemon-data/types';

export class GetPokemonDataDTO {
  @Expose()
  stats: StatResponse[];

  @Expose()
  types: TypeResponse[];

  @Expose()
  weight: number;

  @Expose()
  name: string;

  @Expose()
  id: number;

  @Expose()
  height: number;
}

export interface PokemonDataParsed {
  stats: {
    hp: StatBattleData;
    defense: StatBattleData;
    special_defense: StatBattleData;
    attack: StatBattleData;
    special_attack: StatBattleData;
    speed: StatBattleData;
  };
  types: TypeData[];
  weight: number;
  name: string;
  id: number;
  height: number;
}

interface StatBattleData {
  base_value: number;
  actual_value: number;
}
