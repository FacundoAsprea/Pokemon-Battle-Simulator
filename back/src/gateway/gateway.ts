import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { UserBattleState, Action } from './types';
import { BattleService } from './battle.service';
import { BattleStateService } from './battleState.service';

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

  constructor(
    private battleStateService: BattleStateService,
    private battleService: BattleService,
  ) {}

  //DESCONEXIONES
  @SubscribeMessage('leaveQueue')
  onQueueLeave(@MessageBody() disconnectedPlayer: UserBattleState) {
    this.battleStateAux.usersdata = this.battleStateAux.usersdata.filter(
      (player: UserBattleState) => player.uid != disconnectedPlayer.uid,
    );
  }
  @SubscribeMessage('disconnectPlayer')
  onDisconnect(@MessageBody() disconnectedPlayer: UserBattleState) {
    const battleState = this.battleStateService.getState();
    this.battleStateService.setState({
      ...battleState,
      usersdata: battleState.usersdata.filter(
        (player: UserBattleState) => player.uid != disconnectedPlayer.uid,
      ),
    });
    console.log(
      'PLAYER ELIMINADO: ',
      this.battleStateService.getState().usersdata,
    );
  }

  //INGRESO A LA SALA
  @SubscribeMessage('joinRoom')
  onJoin(@MessageBody() player: UserBattleState) {
    this.battleStateAux.usersdata.push(player);
    console.log('SE HA AGREGADO UN JUGADOR: ', player);

    if (this.battleStateAux.usersdata.length == 2) {
      console.log('LA PELEA PUEDE EMPEZAR');
      //DEJAR DE USAR EL AUXILIAR
      this.battleStateService.setState(this.battleStateAux);

      this.server.emit('startBattle', this.battleStateService.getState());
    }
  }

  //ACCIONESasd
  @SubscribeMessage('action')
  onAction(@MessageBody() action: Action) {
    console.log('SE REGISTRO UNA ACCION', action);

    const actionsWereExecuted = this.battleService.handleAction(action);
    if (actionsWereExecuted) {
      console.log('EMITIENDO UN TURN: ', this.battleStateService.getState());
      this.server.emit('turn', {
        uiUpdate: this.battleService.uiUpdate,
        newBattleState: this.battleStateService.getState(),
      });

      this.battleService.movesQueue = [];
      this.battleService.uiUpdate = [];
    }
  }
}
