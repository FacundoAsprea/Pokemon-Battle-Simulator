import { Type } from '@shared/types/battledata';
import { AttackPriority, Boosts } from '@shared/types/moves';

export interface movesjson {
  num: number;
  accuracy: number | boolean;
  basePower: number;
  category: string;
  name: string;
  pp: number;
  priority: AttackPriority;
  flags: Record<string, number>;
  drain?: number[];
  secondary?: null | {
    chance: number;
    boosts?: Boosts;
    self?: { boosts?: Boosts };
  };
  target:
    | 'normal'
    | 'self'
    | 'any'
    | 'allAdjacentFoes'
    | 'allAdjacent'
    | 'allyTeam'
    | 'scripted';
  type: Type;
  contestType: string;
  boosts?: Boosts;
  drain?: number[];
  isNonstandard?: string;
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
