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
  name: string
}