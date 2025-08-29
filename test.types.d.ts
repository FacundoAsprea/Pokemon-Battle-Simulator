export class Pokemon {
  constructor(
    public stats: PokemonStats,
    public name: string,
    public moveset: Movement[],
    public ability: Ability,
    public cryURL: string,
    public spriteURL: string,
    public statusChanges: StatusChange[],
  ) {}
}

export interface PokemonStats {
  hp: number;
  attack: number;
  specialAttack: number;
  defense: number;
  specialDefense: number;
  speed: number;
  types: PokemonType[];
  weight: number;
}
export interface PokemonType {
  name: string;
}
export interface Movement {
  name: string;
  accuracy: number;
  damageType: string;
  attackType: PokemonType;
  power: number;
  pp: number;
  priority: number;
  critRate: number;
  flinchChance: number;
}

export interface Ability {
  name: string;
}

export interface StatusChange {
  name: string;
}
