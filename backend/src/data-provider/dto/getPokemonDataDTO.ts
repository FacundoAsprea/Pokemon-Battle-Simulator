import { Expose } from 'class-transformer';
import type { TypeBattleData } from '@shared/types/battledata';
import type { StatResponse, TypeResponse } from '../pokemon-data/types';
import type { StatBattleData } from '@shared/types/battledata';

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
  types: TypeBattleData[];
  weight: number;
  name: string;
  id: number;
  height: number;
  selected: boolean;
}

export interface MoveData {
  name: string;
  power: number;
  pp: number;
  priority: number;
  accuracy: number;
  damage_class: 'physical' | 'status' | 'special';
  type: string;
  target: string;
}
