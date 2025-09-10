import { useContext, useState } from "react";
import { webSocket } from "@/services/websocket.service";
import { BattleContext } from "@/contexts/battleContext";
import type { contextType } from "@/contexts/battleContext";
import Stage from "./stage";


import background from "@/assets/images/background.png"

const BattleWrapper = () => {
  const [selectedPokemon, setSelectedPokemon] = useState()
  const {battleState, setBattleState} = useContext(
    BattleContext
  ) as contextType;
  console.log("BATTLESTATE: ", battleState)
  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <main className="flex flex-col h-full w-[70%] bg-transparent">
          <div style={{backgroundImage: `url(${background})`}} className="w-full flex h-full justify-between bg-no-repeat bg-cover">
            <Stage view="player" />
            <Stage view="rival" />
          </div>
          <div className="bg-blue-400 w-full flex h-[40%]"></div>
        </main>
    </div>
  );
};

export default BattleWrapper;
