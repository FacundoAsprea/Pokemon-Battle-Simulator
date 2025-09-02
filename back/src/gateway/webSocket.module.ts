import { Module } from '@nestjs/common';
import { BattleGateway } from './gateway';

@Module({
  providers: [BattleGateway],
})
export class WebSocketModule {}
