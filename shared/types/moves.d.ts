import { Type } from "./battledata";

export interface MoveData {
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

interface Boosts {
  atk: number;
  spe: number;
  def: number;
  spd: number;
  spa: number;
}

type userUID = string;
type pokemonName = string;