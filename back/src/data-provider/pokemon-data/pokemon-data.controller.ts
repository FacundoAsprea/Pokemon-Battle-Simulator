import { Controller, Param, Get } from '@nestjs/common';
import { PokemonDataService } from './pokemon-data.service';

@Controller('pokemon/data')
export class PokemonDataController {
  constructor(private readonly pokemonDataService: PokemonDataService) {}

  @Get('/pokemon/:id')
  getData(@Param('id') id: string) {
    return this.pokemonDataService.getPokemonData(id);
  }

  @Get('/types')
  getAllTypes() {
    return this.pokemonDataService.getAllTypesData();
  }

  @Get('/types/:name')
  getType(@Param('name') typeName: string) {
    return this.pokemonDataService.getType(typeName);
  }
}
