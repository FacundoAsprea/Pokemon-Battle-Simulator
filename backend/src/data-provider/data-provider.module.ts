import { Module } from '@nestjs/common';
import { SpritesModule } from './sprites/sprites.module';
import { PokemonDataModule } from './pokemon-data/pokemon-data.module';
import { IpModule } from './ip/ip.module';

@Module({
  imports: [SpritesModule, PokemonDataModule, IpModule],
})
export class DataProviderModule {}
