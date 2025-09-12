import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { UserBattleState, GlobalBattleState, Attack } from './types';

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
  private battleStateAux: { usersdata: any[]; battledata: { turn: string } } = {
    usersdata: [],
    battledata: { turn: 'test' },
  };
  private battleState: GlobalBattleState;
  private turn: 0 | 1 = 0;

  //FUNCION PARA ALTERNAR EL TURNO
  turnShift() {
    if (this.turn == 0) {
      this.turn = 1;
      this.battleState.battledata.turn =
        this.battleState.usersdata[this.turn].uid;
      return;
    }
    this.turn = 0;
    this.battleState.battledata.turn =
      this.battleState.usersdata[this.turn].uid;
  }

  //DESCONEXIONES
  @SubscribeMessage('leaveQueue')
  onQueueLeave(@MessageBody() disconnectedPlayer: UserBattleState) {
    this.battleStateAux.usersdata = this.battleState.usersdata.filter(
      (player: UserBattleState) => player.uid != disconnectedPlayer.uid,
    );
  }
  @SubscribeMessage('disconnectPlayer')
  onDisconnect(@MessageBody() disconnectedPlayer: UserBattleState) {
    this.battleState.usersdata = this.battleState.usersdata.filter(
      (player: UserBattleState) => player.uid != disconnectedPlayer.uid,
    );
    console.log('PLAYER ELIMINADO: ', this.battleState.usersdata);
  }

  //INGRESO A LA SALA
  @SubscribeMessage('joinRoom')
  onJoin(@MessageBody() player: UserBattleState) {
    this.battleStateAux.usersdata.push(player);
    console.log('SE HA AGREGADO UN JUGADOR: ', player);

    if (this.battleStateAux.usersdata.length == 2) {
      console.log('LA PELEA PUEDE EMPEZAR');
      //DEJAR DE USAR EL AUXILIAR
      this.battleState = { ...this.battleStateAux };

      //EMPIEZA EL CREADOR DE LA SALA
      this.battleState.battledata.turn =
        this.battleState.usersdata[this.turn].uid;
      this.server.emit('startBattle', this.battleState);
    }
  }

  //ACCIONES asd
  @SubscribeMessage('attack')
  onAttack(@MessageBody() attack: Attack) {
    console.log('SE REGISTRO UN ATAQUE: ', attack);
    this.turnShift();
    this.server.emit('shift', this.battleState);
  }
}
