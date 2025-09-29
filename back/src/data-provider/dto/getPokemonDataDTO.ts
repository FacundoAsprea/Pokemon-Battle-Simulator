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
  moveset: MoveData[];
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
  selected: boolean;
}

interface StatBattleData {
  base_value: number;
  current_value: number;
}

export interface MoveData {
  name: string;
  power: number;
  pp: number;
  priority: number;
  accuracy: number;
  damage_class: 'physical' | 'status' | 'special';
  type: string;
}
