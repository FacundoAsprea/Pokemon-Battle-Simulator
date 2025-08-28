import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { getImageDTO } from './dto/getImage.dto';
import axios from 'axios';

@Injectable()
export class DataProviderService {
  private pokeapiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  async getAllImageData() {
    const allImages: getImageDTO[] = [];
    for (let id = 1; id != 386; id++) {
      console.log(id);
      const { data } = await axios.get<getImageDTO>(`${this.pokeapiUrl + id}`);
      const imageData = plainToInstance(getImageDTO, data, {
        excludeExtraneousValues: true,
      });
      allImages.push(imageData);
    }
    return allImages;
  }

  async getImageData(id: string): Promise<getImageDTO> {
    console.log('Inicio funcion');
    const { data } = await axios.get<getImageDTO>(`${this.pokeapiUrl + id}`);
    const imageData = plainToInstance(getImageDTO, data, {
      excludeExtraneousValues: true,
    });
    return imageData;
  }
}
