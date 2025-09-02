import type { PlayerData } from "@/types";
import { io, Socket } from "socket.io-client";

export class WebSocketService {
  private webSocketURL = "";
  private socket: Socket;
  constructor(private player: PlayerData, ip: string) {
    this.webSocketURL = `http://${ip}:3100`;
    this.socket = io(this.webSocketURL);
  }

  joinRoom() {
    this.socket.emit("joinRoom", { name: this.player.name });
  }

  waitForBattle() {
    this.socket.on("startBattle", (res) => {
      console.log("EMPEZO LA PELEA: ", res);
    });
  }
}
