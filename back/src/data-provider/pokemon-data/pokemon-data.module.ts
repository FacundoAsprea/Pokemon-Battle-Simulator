import { Module } from '@nestjs/common';
import { PokemonDataService } from './pokemon-data.service';
import { PokemonDataController } from './pokemon-data.controller';

@Module({
  controllers: [PokemonDataController],
  providers: [PokemonDataService],
  exports: [PokemonDataService],
})
export class PokemonDataModule {}
