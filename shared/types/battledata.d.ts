import type { MoveData } from "./moves";
export interface PokemonBattleData {
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
  height: number;
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    gif_default: string;
    gif_back: string;
  };
  selected: boolean;
}

export interface TypeBattleData {
  damage_relations: DamageRelations;
  name: Type;
  id: number;
}

export interface StatBattleData {
  base_stat: number;
  current_value: number;
  boost?: number;
}

export interface DamageRelations {
  double_damage_from: Type[];
  double_damage_to: Type[];
  half_damage_from: Type[];
  half_damage_to: Type[];
  no_damage_from: Type[];
  no_damage_to: Type[];
}

export type Type =
  | 'grass'
  | 'fire'
  | 'water'
  | 'ground'
  | 'rock'
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'fairy'
  | 'dark';