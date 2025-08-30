import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getImageDTO } from '../dto/getImage.dto';
import axios from 'axios';
import sprites from './data.json';

@Injectable()
export class SpritesService {
  private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  async getSprite(id: string): Promise<getImageDTO> {
    console.log('Inicio funcion');
    const { data } = await axios.get<getImageDTO>(`${this.pokeapiUrl + id}`);
    const imageData = plainToInstance(getImageDTO, data, {
      excludeExtraneousValues: true,
    });
    return imageData;
  }

  getAllSprites() {
    return sprites;
  }
}
