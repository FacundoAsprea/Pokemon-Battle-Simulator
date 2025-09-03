import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { PlayerData } from './types';

@WebSocketGateway(3100, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET'],
    credentials: true,
  },
})
export class BattleGateway {
  @WebSocketServer()
  server: Server;
  private players: PlayerData[] = [];

  @SubscribeMessage('disconnectPlayer')
  onDisconnect(@MessageBody() disconnectedPlayer: PlayerData) {
    this.players = this.players.filter(
      (player) => player.name != disconnectedPlayer.name,
    );
    console.log('PLAYER ELIMINADO: ', this.players);
  }

  @SubscribeMessage('test')
  onTest(@MessageBody() body: any) {
    console.log(body);
  }

  @SubscribeMessage('joinRoom')
  onJoin(@MessageBody() player: PlayerData) {
    this.players.push(player);
    console.log('SE HA AGREGADO UN JUGADOR: ', player);

    if (this.players.length == 2) {
      console.log('LA PELEA PUEDE EMPEZAR');
      this.server.emit('startBattle', true);
    }
  }
}
