import { Injectable } from '@nestjs/common';
import { BattleStateService } from './battleState.service';
import type { Action, uiUpdates, UserBattleState } from './types';

@Injectable()
export class BattleService {
  movesThisTurn: 0 | 1 | 2 = 0;
  movesQueue: Action[] = [];
  uiUpdate: uiUpdates[] = [];

  constructor(private battleStateService: BattleStateService) {}

  getUserFromAction = (action: Action): UserBattleState => {
    return this.battleStateService
      .getState()
      .usersdata.find((user) => user.uid == action.origin) as UserBattleState;
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
    const player = this.getUserFromAction(action);

    if (action.type == 'swap') {
      const selected = this.getPokemonFromName(action.from, player);
      const swapped = this.getPokemonFromName(action.to, player);

      if (!selected || !swapped) {
        return new Error('Error al obtener datos de un pokemon');
      }

      selected.selected = false;
      swapped.selected = true;

      this.movesThisTurn += 1;
      this.uiUpdate.push({
        user: player.uid,
        message: action.message,
        type: 'swap',
        newSelected: action.to,
      });
    }
  }
}
