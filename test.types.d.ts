

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




export interface TurnResponse {
  uiUpdate: uiUpdates[];
  newBattleState: GlobalBattleState;
}
export type uiUpdates = swapUiUpdate | attackUiUpdate;
interface uiUpdate {
  user: string;
  message: string;
  type: "swap" | "attack";
}
export interface swapUiUpdate extends uiUpdate {
  newSelected: string;
}
export interface attackUiUpdate extends uiUpdate {
  damage: number;
  animation: Type;
  moveName: string;
}

export interface SpriteData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  types: string[];
}

export interface PlayerData {
  name: string;
}





//BACK

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


type userUID = string;
type pokemonName = string;

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

interface StatResponse {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface TypeResponse {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface AbilityResponse {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
