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

export interface Attack {
  origin: string;
  message: string;
  damage: number;
  objective: string;
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
