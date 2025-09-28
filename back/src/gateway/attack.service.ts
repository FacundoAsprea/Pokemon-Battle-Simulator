import { Injectable } from '@nestjs/common';
import { BattleStateService } from './battleState.service';
import { DataService } from './data.service';
import { Attack, PokemonBattleData } from './types';
import { randomInt } from 'crypto';

@Injectable()
export class AttackService {
  constructor(
    private dataService: DataService,
    private battleStateService: BattleStateService,
  ) {}

  private attackExecutions = {
    physical: (attack: Attack) => this.useAttack(attack),
    status: (attack: Attack) => {},
    special: (attack: Attack) => this.useAttack(attack),
  };

  private useAttack(attack: Attack) {
    console.log('EJECUTANDO useAttack');
    console.log('THISs: ', this);
    console.log('DATASERVICE: ', this.dataService);
    const playerPokemon = this.dataService.getSelectedPokemon(attack, 'player');
    const rivalPokemon = this.dataService.getSelectedPokemon(attack, 'rival');
    console.log('APLICANDO ATAQUE SOBRE: ', rivalPokemon);
    const move = this.dataService.getMoveFromName(
      playerPokemon,
      attack.move.name,
    );

    if (!this.checkAccuracy(attack)) {
      console.log('ERRO EL ATAQUE');
      return false;
    }

    const damage = this.calculateDamage(attack);
    console.log('VIDA DEL RIVAL: ', rivalPokemon.stats.hp.actual_value);
    console.log('DAÑO QUE VA A RECIBIR: ', damage);
    rivalPokemon.stats.hp.actual_value -= damage;
    console.log(
      'VIDA DESPUES DEL ATAQUE: ',
      rivalPokemon.stats.hp.actual_value,
    );
    move.pp -= 1;

    console.log(
      'ATAQUE EFECTUADO, NUEVO ESTADO GLOBAL: ',
      this.battleStateService.getState(),
    );
  }

  private damageRelationChart = {
    double_damage_from: 2,
    half_damage_from: 0.5,
    no_damage_from: 0,
  };

  executeAttack(attack: Attack) {
    console.log('EJECUTANDO executeAttack');
    const { move } = attack;
    this.attackExecutions[move.damage_class](attack);
  }

  private checkAccuracy(attack: Attack) {
    console.log('EJECUTANDO checkAccuracy');
    const random = randomInt(0, 100);
    return attack.move.accuracy >= random;
  }

  private calculateDamage(attack: Attack) {
    console.log('EJECUTANDO calculateDamage');
    const playerPokemon = this.dataService.getSelectedPokemon(attack, 'player');
    const rivalPokemon = this.dataService.getSelectedPokemon(attack, 'rival');

    const { power, damage_class } = attack.move;
    const playerPokemonAttack = this.getAttack(playerPokemon, damage_class);
    const rivalPokemonDefense = this.getDefense(rivalPokemon, damage_class);

    const STAB = this.calculateSTAB(playerPokemon, attack);
    const effectiveness = this.calculateEffectiveness(rivalPokemon, attack);

    return this.getDamage(
      power,
      playerPokemonAttack,
      rivalPokemonDefense,
      STAB,
      effectiveness,
    );
  }

  private getDamage(
    power: number,
    attackStat: number,
    defenseStat: number,
    STAB: number,
    effectiveness: number,
  ) {
    console.log('EJECUTANDO getDamage');
    const basePower = (22 * (power / attackStat / defenseStat)) / 50 + 2;
    return basePower * STAB * effectiveness;
  }

  private getAttack(
    pokemon: PokemonBattleData,
    damageClass: 'physical' | 'special' | 'status',
  ) {
    console.log('EJECUTANDO getAttack');
    return damageClass == 'physical'
      ? pokemon.stats.attack.actual_value
      : pokemon.stats.defense.actual_value;
  }

  private getDefense(
    pokemon: PokemonBattleData,
    damageClass: 'physical' | 'special' | 'status',
  ) {
    console.log('EJECUTANDO getDefense');
    return damageClass == 'physical'
      ? pokemon.stats.defense.actual_value
      : pokemon.stats.special_defense.actual_value;
  }

  private calculateSTAB(pokemon: PokemonBattleData, attack: Attack) {
    console.log('EJECUTANDO calculateSTAB');
    return pokemon.types.some((type) => type.name == attack.move.type)
      ? 1.5
      : 1;
  }

  private calculateEffectiveness(pokemon: PokemonBattleData, attack: Attack) {
    console.log('EJECUTANDO calculateEffectiveness');
    let multiplier = 1;
    const attackType = attack.move.type;
    const typeChart = this.dataService.getDefensiveTypeChart(pokemon);
    console.log('TYPECHART: ', typeChart);

    typeChart.forEach((chart) => {
      for (const [damageRelation, types] of Object.entries(chart) as [
        keyof typeof chart,
        (typeof chart)[keyof typeof chart],
      ][]) {
        if (types.some((type) => type == attackType)) {
          console.log('SU RELACION ES: ', damageRelation);
          console.log('LAS KEYS SON: ', Object.keys(this.damageRelationChart));
          console.log(
            'SE MULTIPLICARA POR: ',
            this.damageRelationChart[damageRelation],
          );
          multiplier *= this.damageRelationChart[damageRelation];
        }
      }
    });
    return multiplier;
  }
}
