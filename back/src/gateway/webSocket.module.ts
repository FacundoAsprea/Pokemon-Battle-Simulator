import { Module } from '@nestjs/common';
import { BattleGateway } from './gateway';
import { BattleStateService } from './battleState.service';
import { BattleService } from './battle.service';
//asdasd
@Module({
  providers: [BattleGateway, BattleStateService, BattleService],
})
export class WebSocketModule {}
