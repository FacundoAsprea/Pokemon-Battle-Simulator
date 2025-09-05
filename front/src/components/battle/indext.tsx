import { useContext } from "react";
import { BattleContext } from "@/contexts/battleContext";
import type { contextType } from "@/contexts/battleContext";
import Stage from "./stage";

const BattleWrapper = () => {
  const [battleState, setBattleState] = useContext(
    BattleContext
  ) as contextType;
  console.log("BATTLESTATE: ", battleState)
  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <main className="flex flex-col h-full w-[70%] bg-red-300">
          <div className="bg-yellow-400 w-full flex h-full justify-between">
            <Stage view="player" />
            <Stage view="rival" />
          </div>
          <div className="bg-blue-400 w-full flex h-[40%]"></div>
        </main>
    </div>
  );
};

export default BattleWrapper;
