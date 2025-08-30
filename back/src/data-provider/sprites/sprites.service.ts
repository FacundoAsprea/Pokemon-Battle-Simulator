import { Injectable } from '@nestjs/common';
import sprites from './data.json';

@Injectable()
export class SpritesService {
  private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  getSprite(id: string) {
    return sprites.find((sprite) => sprite.id.toString() == id);
  }

  getAllSprites() {
    return sprites;
  }
}
