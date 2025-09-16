import type { Action, GlobalBattleState } from "@/game/types";
import type { PlayerData } from "@/types";
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
    this.socket.emit("action", action)
  }

  waitFor(message: "startBattle" | "turn") {
    return new Promise<GlobalBattleState>((resolve) => {
      this.socket.once(message, (messageBody: GlobalBattleState) => {
        resolve(messageBody);
      });
    });
  }
}

export const webSocket = new WebSocketService();
