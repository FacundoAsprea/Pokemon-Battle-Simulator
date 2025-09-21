import type { Action, GlobalBattleState } from "@/game/types";
import type { PlayerData, TurnResponse } from "@/types";
import { io, Socket } from "socket.io-client";

class WebSocketService {
  private socket!: Socket;
  private player!: PlayerData;
  private battleStatus = [];

  startConnection(ip: string, player: PlayerData) {
    this.socket = io(`http://${ip}:3100`);
    this.player = player;
    console.log("Conexion establecida");
  }

  leaveQueue() {
    console.log("DISCONNECTING PLAYER: ", this.player);
    this.socket.emit("leaveQueue", this.player);
  }

  joinRoom() {
    this.socket.emit("joinRoom", this.player);
  }

  sendAction(action: Action) {
    this.socket.emit("action", action);
  }

  waitForGameStart() {
    return new Promise<GlobalBattleState>((resolve) => {
      return this.socket.once(
        "startBattle",
        (messageBody: GlobalBattleState) => {
          resolve(messageBody);
        }
      );
    });
  }

  waitForTurn() {
    return new Promise<TurnResponse>((resolve) => {
      return this.socket.once("turn", (messageBody: TurnResponse) => {
        console.log("EL WEBSOCKET ENVIO UN TURN: ", messageBody)
        resolve(messageBody);
      });
    });
  }
}

export const webSocket = new WebSocketService();
