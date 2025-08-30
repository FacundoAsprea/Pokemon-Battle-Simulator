import { Expose, Type } from 'class-transformer';
import type { TypeResponse } from '../pokemon-data/types';

class spritesDTO {
  @Expose()
  front_default: string;

  @Expose()
  back_default: string;
}

export class getImageDTO {
  @Expose()
  @Type(() => spritesDTO)
  sprites: spritesDTO;

  @Expose()
  name: string;

  @Expose()
  id: number;

  @Expose()
  types: TypeResponse[];
}
