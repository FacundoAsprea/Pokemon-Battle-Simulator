import { Expose } from 'class-transformer';
import { TypeData } from '../pokemon-data/types';
import type {
  StatResponse,
  TypeResponse,
  AbilityResponse,
} from '../pokemon-data/types';

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

  @Expose()
  abilities: AbilityResponse[];
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
  abilities: AbilityResponse[];
}
// export interface PokemonBattleData {
//   stats: {
//     hp: StatBattleData;
//     defense: StatBattleData;
//     special_defence: StatBattleData;
//     attack: StatBattleData;
//     special_attack: StatBattleData;
//     speed: StatBattleData;
//   };
//   types: TypeBattleData[];
//   weight: number;
//   id: number;
//   name: string;
//   sprites: {
//     front_default: string;
//     backs_default: string;
//   };
// }

interface StatBattleData {
  base_value: number;
  actual_value: number;
}
