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
  hasPlayed: false;
}

//Objeto para actualizar el front
export type uiUpdates = swapUiUpdate | attackUiUpdate;
interface uiUpdate {
  user: string;
  message: string;
  type: 'swap' | 'attack';
}
export interface swapUiUpdate extends uiUpdate {
  newSelected: string;
}
export interface attackUiUpdate extends uiUpdate {
  animation: Type;
  damage: number;
  moveName: string;
}

//Datos del pokemon
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
  selected: boolean;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

interface StatBattleData {
  base_value: number;
  current_value: number;
  boost?: number;
}

export interface TypeBattleData {
  damage_relations: DamageRelations;
  name: string;
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

//Movimientos
export type Action = Attack | Swap;
type AttackPriority = -6 | -5 | -1 | 0 | 1 | 2 | 3 | 4;
export interface Attack {
  priority: AttackPriority;
  type: 'attack';
  origin: userUID;
  message: string;
  move: MoveData;
}

export interface Swap {
  priority: 0.5;
  type: 'swap';
  origin: userUID;
  message: string;
  from: pokemonName;
  to: pokemonName;
}

interface MoveData {
  name: string;
  power: number;
  pp: number;
  priority: number;
  accuracy: number;
  damage_class: 'physical' | 'status' | 'special';
  type: Type;
  boosts: Boosts;
  target: 'normal' | 'self';
}

interface Boosts {
  atk: number;
  spe: number;
  def: number;
  spd: number;
  spa: number;
}

//tipos
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

type userUID = string;
type pokemonName = string;
