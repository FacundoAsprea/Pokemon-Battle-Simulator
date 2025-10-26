import { Injectable } from '@nestjs/common';
import { DataService } from './data.service';
import type { Action, Attack, Boosts } from '@shared/types/moves';
import type { PokemonBattleData } from '@shared/types/battledata';
import { randomInt } from 'crypto';

@Injectable()
export class AttackService {
  constructor(private dataService: DataService) {}

  private attackExecutions = {
    physical: (attack: Attack) => this.useAttack(attack),
    status: (attack: Attack) => this.useStatusAttack(attack),
    special: (attack: Attack) => this.useAttack(attack),
  };

  private damageRelationChart = {
    double_damage_from: 2,
    half_damage_from: 0.5,
    no_damage_from: 0,
  };

  private boostStatChart: Record<
    keyof Boosts,
    keyof PokemonBattleData['stats']
  > = {
    atk: 'attack',
    spe: 'speed',
    spd: 'special_defense',
    spa: 'special_attack',
    def: 'defense',
  };

  private useStatusAttack(attack: Attack) {
    const { move } = attack;
    if (move.boosts) {
      const target = move.target == 'self' ? 'player' : 'rival';
      const targetedPokemon = this.dataService.getSelectedPokemon(
        attack,
        target,
      );

      for (const [stat, boost] of Object.entries(move.boosts) as [
        keyof Boosts,
        number,
      ][]) {
        const statIndex = this.boostStatChart[stat];
        targetedPokemon.stats[statIndex].multiplier += boost;
      }
    }
    return 0;
  }

  private useAttack(attack: Attack) {
    const rivalPokemon = this.dataService.getSelectedPokemon(attack, 'rival');
    const { move } = attack;

    if (!this.checkAccuracy(attack)) {
      console.log('ERRO EL ATAQUE');
      return 0;
    }

    const damage = this.calculateDamage(attack);
    console.log('DAMAGE: ', damage);
    this.applyDamage(rivalPokemon, damage);
    move.pp -= 1;

    return damage;
  }

  executeAttack(attack: Attack) {
    const { move } = attack;
    const playerPokemon = this.dataService.getSelectedPokemon(attack, 'player');

    if (playerPokemon.stats.hp.current_value <= 0) {
      return 0;
    }
    return this.attackExecutions[move.damage_class](attack);
  }

  //Utils
  private checkAccuracy(attack: Attack) {
    const random = randomInt(0, 100);
    return attack.move.accuracy >= random;
  }

  private calculateDamage(attack: Attack) {
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
    console.log(power, attackStat, defenseStat, STAB, effectiveness);
    const basePower = (22 * ((power * attackStat) / defenseStat)) / 50 + 2;
    return Math.floor(basePower * STAB * effectiveness);
  }

  private getAttack(
    pokemon: PokemonBattleData,
    damageClass: 'physical' | 'special' | 'status',
  ) {
    const attackStat =
      damageClass == 'physical'
        ? pokemon.stats.attack
        : pokemon.stats.special_attack;
    return attackStat.current_value * attackStat.multiplier;
  }

  private getDefense(
    pokemon: PokemonBattleData,
    damageClass: 'physical' | 'special' | 'status',
  ) {
    const defenseStat =
      damageClass == 'physical'
        ? pokemon.stats.defense
        : pokemon.stats.special_defense;
    return defenseStat.current_value * defenseStat.multiplier;
  }

  private calculateSTAB(pokemon: PokemonBattleData, attack: Attack) {
    return pokemon.types.some((type) => type.name == attack.move.type)
      ? 1.5
      : 1;
  }

  private calculateEffectiveness(pokemon: PokemonBattleData, attack: Attack) {
    let multiplier = 1;
    const attackType = attack.move.type;
    const typeChart = this.dataService.getDefensiveTypeChart(pokemon);

    typeChart.forEach((chart) => {
      for (const [damageRelation, types] of Object.entries(chart) as [
        keyof typeof chart,
        (typeof chart)[keyof typeof chart],
      ][]) {
        if (types.some((type) => type == attackType)) {
          multiplier *= this.damageRelationChart[damageRelation];
        }
      }
    });
    return multiplier;
  }

  private applyDamage(pokemon: PokemonBattleData, damage: number) {
    const { hp } = pokemon.stats;
    hp.current_value -= damage;

    if (hp.current_value < 0) hp.current_value = 0;
  }

  handlePriorityTie(movesQueue: Action[]) {
    const firstAttackPokemon = this.dataService.getSelectedPokemonFromUser(
      this.dataService.getUserFromUID(movesQueue[0].origin),
    );
    const secondAttackPokemon = this.dataService.getSelectedPokemonFromUser(
      this.dataService.getUserFromUID(movesQueue[1].origin),
    );

    const firstSpeed =
      firstAttackPokemon.stats.speed.current_value *
      firstAttackPokemon.stats.speed.multiplier;
    const secondSpeed =
      secondAttackPokemon.stats.speed.current_value *
      secondAttackPokemon.stats.speed.multiplier;

    if (secondSpeed == firstSpeed) this.handleSpeedTie(movesQueue);
    if (secondSpeed > firstSpeed) movesQueue.reverse();
  }

  handleSpeedTie(movesQueue: Action[]) {
    const tie = randomInt(0, 1);
    if (tie) movesQueue.reverse();
  }
}
