import { Module } from '@nestjs/common';
import { BattleGateway } from './gateway';
import { BattleStateService } from './battleState.service';
import { BattleService } from './battle.service';
import { AttackService } from './attack.service';
import { DataService } from './data.service';
//asdasd
@Module({
  providers: [
    BattleGateway,
    BattleStateService,
    BattleService,
    AttackService,
    DataService,
  ],
})
export class WebSocketModule {}
