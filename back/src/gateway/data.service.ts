import { Injectable } from '@nestjs/common';
import {
  Action,
  DamageRelations,
  PokemonBattleData,
  Type,
  UserBattleState,
} from './types';
import { BattleStateService } from './battleState.service';

@Injectable()
export class DataService {
  constructor(private battleStateService: BattleStateService) {}

  getUserFromAction = (action: Action, user: 'player' | 'rival') => {
    const userData = this.battleStateService
      .getState()
      .usersdata.find((userdata) =>
        user == 'player'
          ? userdata.uid == action.origin
          : userdata.uid != action.origin,
      );
    if (!userData) throw new Error('Error obteniendo datos del usuario');
    return userData;
  };

  getSelectedPokemon = (action: Action, user: 'player' | 'rival') => {
    const userData = this.getUserFromAction(action, user);
    const selectedPokemon = userData.team.find((pokemon) => pokemon.selected);
    if (!selectedPokemon)
      throw new Error('Error obteniendo datos del pokemon seleccionado');
    return selectedPokemon;
  };

  getPokemonFromName = (name: string, userRef: UserBattleState) => {
    const pokemon = userRef.team.find((pokemon) => pokemon.name == name);
    if (!pokemon) throw new Error('Error obteniendo datos del pokemon');
    return pokemon;
  };

  getDefensiveTypeChart(pokemon: PokemonBattleData) {
    return pokemon.types.map((type) => {
      console.log(
        'CREANDO UNA DefensiveDamageRelation con: ',
        type.damage_relations,
      );
      return new DefensiveDamageRelation(type.damage_relations);
    });
  }

  getMoveFromName(pokemon: PokemonBattleData, moveName: string) {
    const move = pokemon.moveset.find((move) => move.name == moveName);
    if (!move) throw new Error('Error obteniendo datos del ataque');
    return move;
  }
}

class DefensiveDamageRelation {
  double_damage_from: Type[];
  half_damage_from: Type[];
  no_damage_from: Type[];

  constructor(damageRelation: DamageRelations) {
    console.log('DAMAGERELATION DEL CONSTRUCTOR: ', damageRelation);
    const { double_damage_from, half_damage_from, no_damage_from } =
      damageRelation;
    Object.assign(this, {
      double_damage_from,
      half_damage_from,
      no_damage_from,
    });
  }
}
