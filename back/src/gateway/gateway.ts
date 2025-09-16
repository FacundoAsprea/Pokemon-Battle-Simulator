import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { UserBattleState, GlobalBattleState, Action } from './types';

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
  private movesThisTurn: 0 | 1 | 2 = 0;
  private queuedActions: Action[] = [];

  checkForMoves = () => {
    console.log('MOVIMIENTOS EN ESTE TURNO: ', this.movesThisTurn);
    if (this.movesThisTurn == 2) {
      this.movesThisTurn = 0;
      this.server.emit('turn', this.battleState);
      this.queuedActions = [];
      return;
    }
  };

  getUserFromAction = (action: Action): UserBattleState => {
    return this.battleState.usersdata.find(
      (user) => user.uid == action.origin,
    ) as UserBattleState;
  };

  getPokemonFromName = (name: string, userRef: UserBattleState) => {
    const pokemon = userRef.team.find((pokemon) => pokemon.name == name);
    return pokemon ? pokemon : null;
  };

  //FUNCION PARA APLICAR LA ACCION DEL JUGADORasdda
  handleAction(action: Action) {
    const player = this.getUserFromAction(action);
    this.queuedActions.push(action);

    if (action.type == 'swap') {
      const selected = this.getPokemonFromName(action.from, player);
      const swapped = this.getPokemonFromName(action.to, player);

      if (!selected || !swapped)
        return new Error('Error al obtener datos de un pokemon');

      selected.selected = false;
      swapped.selected = true;

      this.movesThisTurn += 1;
      this.checkForMoves();
    }
    // haceElCambio
  }

  //DESCONEXIONES
  @SubscribeMessage('leaveQueue')
  onQueueLeave(@MessageBody() disconnectedPlayer: UserBattleState) {
    this.battleStateAux.usersdata = this.battleStateAux.usersdata.filter(
      (player: UserBattleState) => player.uid != disconnectedPlayer.uid,
    );
  }
  @SubscribeMessage('disconnectPlayer')
  onDisconnect(@MessageBody() disconnectedPlayer: UserBattleState) {
    console.log('AUX: ', this.battleStateAux);
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

      this.server.emit('startBattle', this.battleState);
    }
  }

  //ACCIONES
  @SubscribeMessage('action')
  onAction(@MessageBody() action: Action) {
    console.log('SE REGISTRO UNA ACCION', action);
    this.handleAction(action);
  }
}
