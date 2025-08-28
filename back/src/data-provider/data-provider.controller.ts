import { Controller, Get, Body, Param } from '@nestjs/common';
import { DataProviderService } from './data-provider.service';
import * as allImages from './data.json';

@Controller('pokemon')
export class DataProviderController {
  constructor(private readonly dataProviderService: DataProviderService) {}

  @Get('/allImages')
  getAllImages() {
    return allImages;
  }
  @Get('/imageData/:id')
  getImage(@Param('id') pokemonId: string) {
    return this.dataProviderService.getImageData(pokemonId);
  }
}
