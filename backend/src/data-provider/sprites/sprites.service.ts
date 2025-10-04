import { Injectable } from '@nestjs/common';
import sprites from './data.json';
import gifs from './gifs.json';

@Injectable()
export class SpritesService {
  getSprite(id: string) {
    return sprites.find((sprite) => sprite.id.toString() == id);
  }

  getAllSprites() {
    return sprites;
  }

  getGif(id: string) {
    return gifs.find((gif) => gif.id.toString() == id);
  }
}
