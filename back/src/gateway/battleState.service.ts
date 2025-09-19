import { Injectable } from '@nestjs/common';
import type { GlobalBattleState } from './types';

@Injectable()
export class BattleStateService {
  battleState: GlobalBattleState;

  getState() {
    return this.battleState;
  }

  setState(newState: GlobalBattleState) {
    this.battleState = newState;
  }
}
