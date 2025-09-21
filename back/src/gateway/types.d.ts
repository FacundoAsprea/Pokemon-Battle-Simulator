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

export type uiUpdates = swapUiUpdate | attackUiUpdate;
interface uiUpdate {
  user: string;
  message: string;
  type: 'swap' | 'attack' | 'status';
}
export interface swapUiUpdate extends uiUpdate {
  newSelected: string;
}
export interface attackUiUpdate extends uiUpdate {
  objective: string;
}

//Movimientos
export type Action = Attack | Swap;
export interface Attack {
  priority: number;
  type: 'attack';
  origin: userUID;
  message: string;
  move: MoveData;
}

export interface Swap {
  priority: 999;
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
  type: string;
}

//datos
export interface PokemonBattleData {
  stats: {
    hp: StatBattleData;
    defense: StatBattleData;
    special_defence: StatBattleData;
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

type userUID = string;
type pokemonName = string;
