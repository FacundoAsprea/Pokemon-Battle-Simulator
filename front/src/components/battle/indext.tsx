import { createContext, useState } from "react";
import { webSocket } from "@/services/websocket.service";
import Stage from "./stage";

const BattleContext = createContext('');
const BattleWrapper = () => {
  const [test, setTest] = useState("test");
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <BattleContext.Provider value={test}>
        <main className="flex flex-col h-full w-[70%] bg-red-300">
          <div className="bg-yellow-400 w-full flex h-full justify-between">
            <Stage view="player" />
            <Stage view="rival" />
          </div>
          <div className="bg-blue-400 w-full flex h-[40%]"></div>
        </main>
      </BattleContext.Provider>
    </div>
  );
};

export default BattleWrapper;
