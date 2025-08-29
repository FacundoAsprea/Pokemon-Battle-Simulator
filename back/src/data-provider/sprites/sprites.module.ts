import { Module } from '@nestjs/common';
import { SpritesService } from './sprites.service';
import { SpritesController } from './sprites.controller';

@Module({
  controllers: [SpritesController],
  providers: [SpritesService],
  exports: [SpritesService],
})
export class SpritesModule {}
