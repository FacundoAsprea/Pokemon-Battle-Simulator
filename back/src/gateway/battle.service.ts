import { Injectable } from '@nestjs/common';
import type { Action, Attack, Swap, uiUpdates } from './types';
import { AttackService } from './attack.service';
import { DataService } from './data.service';

@Injectable()
export class BattleService {
  movesThisTurn: 0 | 1 | 2 = 0;
  movesQueue: Action[] = [];
  uiUpdate: uiUpdates[] = [];

  constructor(
    private dataService: DataService,
    private attackService: AttackService,
  ) {}

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

  sortActionsByPriority() {
    const firtsActionPriority = this.movesQueue[0].priority;

    //si ambos ataques tienen la misma prioridad, usar las stats de velocidad
    const priorityTie = this.movesQueue.every(
      (move) => move.priority == firtsActionPriority,
    );
    if (priorityTie && firtsActionPriority != 0.5) {
      console.log('ORDEN ANTES DEL EMPATE');
      this.attackService.handlePriorityTie(this.movesQueue);
      console.log('ORDEN DESPUES DEL EMPATE');
    }

    this.movesQueue.sort((a, b) => b.priority - a.priority);
  }

  executeAllActions() {
    this.sortActionsByPriority();
    this.movesQueue.forEach((move) => this.executeAction(move));
  }

  executeAction(action: Action) {
    console.log('SE ESTA EJECUTANDO LA SIGUIENTE ACCION: ', action);

    if (action.type == 'swap') {
      this.executeSwap(action);
    } else {
      console.log('SE EJECUTARA UN ATAQUE');
      this.executeAttack(action);
    }
  }

  executeSwap(swap: Swap) {
    const player = this.dataService.getUserFromAction(swap, 'player');
    const selected = this.dataService.getPokemonFromName(swap.from, player);
    const swapped = this.dataService.getPokemonFromName(swap.to, player);

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
    const player = this.dataService.getUserFromAction(attack, 'player');

    const damage = this.attackService.executeAttack(attack);
    this.movesThisTurn += 1;
    this.uiUpdate.push({
      user: player.uid,
      message: attack.message,
      type: 'attack',
      animation: attack.move.type,
      damage: damage,
      moveName: attack.move.name,
    });
  }
}
