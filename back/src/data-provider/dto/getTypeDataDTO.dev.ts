import { Expose } from 'class-transformer';

export class GetTypeDataDTO {
  @Expose()
  name: string;

  @Expose()
  id: number;

  @Expose()
  damage_relations: DamageRelationObject;
}

export interface DamageRelationObject {
  double_damage_from: TypeResponse[];
  double_damage_to: TypeResponse[];
  half_damage_from: TypeResponse[];
  half_damage_to: TypeResponse[];
  no_damage_from: TypeResponse[];
  no_damage_to: TypeResponse[];
}

export interface TypeResponse {
  name: string;
  url: string;
}
