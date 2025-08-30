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
  stats: { base_stat: number; name: string }[];
  types: TypeData[];
  weight: number;
  name: string;
  id: number;
  height: number;
  abilities: AbilityResponse[];
}
