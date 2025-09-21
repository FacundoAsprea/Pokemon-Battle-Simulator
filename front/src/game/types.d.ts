export interface GlobalBattleState {
  usersdata: UserBattleState[]
  battledata: {
    turn: string
  }
}
export interface UserBattleState {
  team: PokemonBattleData[];
  name: string;
  uid: string;
}
export interface PokemonBattleData {
  stats: {
    hp: StatBattleData,
    defense: StatBattleData,
    special_defence: StatBattleData,
    attack: StatBattleData,
    special_attack: StatBattleData,
    speed: StatBattleData
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
  selected: boolean
}

//ACCIONES
export type Action = Attack | Swap;
export interface Attack {
  type: 'attack';
  origin: string;
  message: string;
  damage: number;
  objective: string;
}

export interface Swap {
  type: 'swap';
  origin: string;
  message: string;
  from: string;
  to: string;
}

interface StatBattleData {
  base_stat: number;
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
