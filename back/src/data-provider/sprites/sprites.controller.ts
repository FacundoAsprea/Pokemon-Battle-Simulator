import { Controller, Get, Param } from '@nestjs/common';
import { SpritesService } from './sprites.service';

@Controller('pokemon/sprites')
export class SpritesController {
  constructor(private readonly spritesService: SpritesService) {}

  @Get()
  getAllSprites() {
    return this.spritesService.getAllSprites();
  }

  @Get('/:id')
  getSprite(@Param('id') id: string) {
    return this.spritesService.getSprite(id);
  }

  @Get('/gif/:id')
  getGif(@Param('id') id: string) {
    return this.spritesService.getGif(id);
  }
}
