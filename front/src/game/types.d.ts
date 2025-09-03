export type GlobalBattleState = [UserBattleState, UserBattleState];
export interface UserBattleState {
  team: PokemonBattleData[];
  name: string;
  uid: string;
}
export interface PokemonBattleData {
  stats: {
    hp: StatsBattleData,
    defense: StatsBattleData,
    special_defence: StatsBattleData,
    attack: StatsBattleData,
    special_attack: StatsBattleData,
    speed: StatsBattleData
  };
  types: TypeBattleData[];
  weight: number;
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

interface StatsBattleData {
  base_value: number;
  actual_value: number;
}

export interface TypeBattleData {
  damages_relations: DamageRelations;
  name: string;
  id: number;
}

export interface DamageRelations {
  double_damage_from: string[];
  double_damage_to: string[];
  half_damage_from: string[];
  half_damage_to: string[];
  no_damage_from: string[];
  no_damage_to: string[];
}
