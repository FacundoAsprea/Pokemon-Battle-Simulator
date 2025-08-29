export interface TypeData {
  name: string;
  id: number;
  damage_relations: DamageRelationObject;
}

export interface DamageRelationObject {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
}
