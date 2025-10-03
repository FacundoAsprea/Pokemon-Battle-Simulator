

//ACCIONES




export interface TurnResponse {
  uiUpdate: uiUpdates[];
  newBattleState: GlobalBattleState;
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


//Datos del pokemon



//Movimientos


type userUID = string;
type pokemonName = string;

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
