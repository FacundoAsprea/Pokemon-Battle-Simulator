import type { GlobalBattleState } from "../types";
import { webSocket } from "@/services/websocket.service";

class Game {
  async runGame(
    setGlobalBattleState: React.Dispatch<
      React.SetStateAction<GlobalBattleState>
    >
  ) {
    const newBattleState = await webSocket.waitFor("turn");
    setGlobalBattleState(newBattleState);
    this.runGame(setGlobalBattleState);
  }
}
const game = new Game()
export default game