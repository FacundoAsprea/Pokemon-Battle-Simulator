export interface GlobalBattleState {
  usersdata: UserBattleState[];
  battledata: {
    turn: string;
  };
}
export interface UserBattleState {
  team: PokemonBattleData[];
  name: string;
  uid: string;
}
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

//ACCIONES
export type Action = Attack | Swap;
type AttackPriority = -6 | -5 | -1 | 0 | 1 | 2 | 3 | 4
export interface Attack {
  priority: AttackPriority
  type: "attack";
  origin: string;
  message: string;
  move: MoveData;
}

export interface Swap {
  priority: 0.5;
  type: "swap";
  origin: string;
  message: string;
  from: string;
  to: string;
}

interface StatBattleData {
  base_stat: number;
  current_value: number;
  boost?: number
}

export interface TypeBattleData {
  damage_relations: DamageRelations;
  name: Type;
  id: number;
}

export interface DamageRelations {
  double_damage_from: Type[];
  double_damage_to: Type[];
  half_damage_from: Type[];
  half_damage_to: Type[];
  no_damage_from: Type[];
  no_damage_to: Type[];
}

interface MoveData {
  name: string;
  power: number;
  pp: number;
  priority: AttackPriority;
  accuracy: number;
  damage_class: 'physical' | 'status' | 'special';
  type: Type;
  boosts?: Boosts
  target?: "normal" | "self"
}

interface Boosts {
  atk: number
  spe: number
  def: number
  spd: number
  spa: number
}

export type Type =
  | "grass"
  | "fire"
  | "water"
  | "ground"
  | "rock"
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "bug"
  | "ghost"
  | "steel"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "fairy"
  | "dark";
