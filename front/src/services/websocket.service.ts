import type { PlayerData } from "@/types";
import { io, Socket } from "socket.io-client";

class WebSocketService {
  private socket!: Socket
  private player!: PlayerData
  private battleStatus = []

  startConnection(ip: string, player: PlayerData) {
    this.socket = io(`http://${ip}:3100`)
    this.player = player
    console.log("Conexion establecida")
  }

  disconnect() {
    this.socket.emit('disconnectPlayer', this.player)
    this.socket.disconnect()
  }

  joinRoom() {
    this.socket.emit("joinRoom", this.player);
  }

  waitForBattle() {
    this.socket.on("startBattle", () => {
      window.location.href = "battle"
      console.log("LA PELEA PUEDE EMPEZAR: ")
    });
  }
}

export const webSocket = new WebSocketService()
