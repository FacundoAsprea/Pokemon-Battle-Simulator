import { Module } from '@nestjs/common';
import { SpritesModule } from './sprites/sprites.module';
import { PokemonDataModule } from './pokemon-data/pokemon-data.module';

@Module({
  imports: [SpritesModule, PokemonDataModule],
})
export class DataProviderModule {}
