import { Expose, Type } from 'class-transformer';

class spritesDTO {
  @Expose()
  front_default: string;
}

export class getImageDTO {
  @Expose()
  @Type(() => spritesDTO)
  sprites: spritesDTO;

  @Expose()
  name: string;

  @Expose()
  id: number;
}
