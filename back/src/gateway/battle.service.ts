import { Injectable } from '@nestjs/common';
import { BattleStateService } from './battleState.service';
import type { Action, Attack, Swap, uiUpdates, UserBattleState } from './types';

@Injectable()
export class BattleService {
  movesThisTurn: 0 | 1 | 2 = 0;
  movesQueue: Action[] = [];
  uiUpdate: uiUpdates[] = [];

  constructor(private battleStateService: BattleStateService) {}

  getUserFromAction = (action: Action, user: "player" | "rival"): UserBattleState => {
    return this.battleStateService
      .getState()
      .usersdata.find((userdata) => user == "player" ? userdata.uid == action.origin : userdata.uid != action.origin) as UserBattleState;
  };

  getPokemonFromName = (name: string, userRef: UserBattleState) => {
    const pokemon = userRef.team.find((pokemon) => pokemon.name == name);
    return pokemon ? pokemon : null;
  };

  //MANEJO DE ACCIONES
  handleAction(action: Action) {
    this.movesQueue.push(action);
    console.log('MOVESQUEUE: ', this.movesQueue);

    if (this.movesQueue.length == 2) {
      this.executeAllActions();
      this.movesQueue = [];
      return true;
    }

    return false;
  }

  executeAllActions() {
    this.movesQueue.sort((a, b) => b.priority - a.priority);

    this.movesQueue.forEach((move) => this.executeAction(move));
  }

  executeAction(action: Action) {
    console.log('SE ESTA EJECUTANDO LA SIGUIENTE ACCION: ', action);

    if (action.type == 'swap') {
      this.executeSwap(action);
    } else {
      this.executeAttack(action);
    }
  }

  executeSwap(swap: Swap) {
    const player = this.getUserFromAction(swap, "player");
    const selected = this.getPokemonFromName(swap.from, player);
    const swapped = this.getPokemonFromName(swap.to, player);

    if (!selected || !swapped) {
      return new Error('Error al obtener datos de un pokemon');
    }

    selected.selected = false;
    swapped.selected = true;

    this.movesThisTurn += 1;
    this.uiUpdate.push({
      user: player.uid,
      message: swap.message,
      type: 'swap',
      newSelected: swap.to,
    });
  }

  executeAttack(attack: Attack) {
    const player = this.getUserFromAction(attack, "player")

    const moveData = attack.move
    this.attackExecutions[moveData.damage_class](attack)
  }

  attackExecutions = {
    "physical": (attack: Attack) => {
      const rival = this.getUserFromAction(attack, "rival")
    },
    "status": (attack: Attack) => {

    },
    "special": (attack: Attack) => {

    },
  }
}
