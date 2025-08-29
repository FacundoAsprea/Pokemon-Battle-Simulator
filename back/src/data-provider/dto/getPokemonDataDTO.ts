import { Expose } from 'class-transformer';
import { GetTypeDataDTO } from './getTypeDataDTO.dev';

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
  types: GetTypeDataDTO[];
  weight: number;
  name: string;
  id: number;
  height: number;
  abilities: AbilityResponse[];
}

interface StatResponse {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface TypeResponse {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface AbilityResponse {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
