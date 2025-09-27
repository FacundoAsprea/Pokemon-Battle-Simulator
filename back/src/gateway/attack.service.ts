import { BattleStateService } from './battleState.service';
import { DataService } from './data.service';
import { Attack, PokemonBattleData } from './types';
import { randomInt } from 'crypto';

export class AttackService {
  constructor(
    private dataService: DataService,
    private battleStateService: BattleStateService,
  ) {}
  
  private attackExecutions = {
    physical: (attack: Attack) => this.useAttack(attack),
    status: (attack: Attack) => this.useAttack(attack),
    special: (attack: Attack) => {},
  };

  private useAttack(attack: Attack) {
    const playerPokemon = this.dataService.getSelectedPokemon(attack, 'player');
    const rivalPokemon = this.dataService.getSelectedPokemon(attack, 'rival');
    const move = this.dataService.getMoveFromName(
      playerPokemon,
      attack.move.name,
    );

    if (!this.checkAccuracy(attack)) return false;
    rivalPokemon.stats.hp.actual_value -= this.calculateDamage(attack);
    move.pp -= 1;

    console.log(
      'ATAQUE EFECTUADO, NUEVO ESTADO GLOBAL: ',
      this.battleStateService.getState(),
    );
  }

  private damageRelationChart: {
    double_damage_from: 2;
    half_damage_from: 0.5;
    no_damage_from: 0;
  };

  executeAttack(attack: Attack) {
    const { move } = attack;
    this.attackExecutions[move.damage_class](attack);
  }

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

    const damage =
      ((22 * ((power * playerPokemonAttack) / rivalPokemonDefense)) / 50 + 2) *
      STAB *
      effectiveness;
    return damage;
  }

  private getAttack(
    pokemon: PokemonBattleData,
    damageClass: 'physical' | 'special' | 'status',
  ) {
    return damageClass == 'physical'
      ? pokemon.stats.attack.actual_value
      : pokemon.stats.defense.actual_value;
  }

  private getDefense(
    pokemon: PokemonBattleData,
    damageClass: 'physical' | 'special' | 'status',
  ) {
    return damageClass == 'physical'
      ? pokemon.stats.defense.actual_value
      : pokemon.stats.special_defense.actual_value;
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
}
