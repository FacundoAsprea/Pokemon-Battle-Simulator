import { useContext, useState, useEffect, useRef } from "react";
import { webSocket } from "@/services/websocket.service";
import { BattleContext } from "@/contexts/battleContext";
import type { GlobalBattleStateType } from "@/contexts/battleContext";
import Stage from "./stage";
import Minicard from "./minicard";
import ActionsMenu from "./actions";

import background from "@/assets/images/background.png";
import type { UserBattleState } from "@/game/types";
import { getPlayerData, getRivalData } from "@/game/functions/getters";
import { isPlayersTurn } from "@/game/functions/getTurn";

const BattleWrapper = () => {
  const [selectedPokemons, setSelectedPokemons] = useState();
  const { globalBattleState, setGlobalBattleState } = useContext(
    BattleContext
  ) as GlobalBattleStateType
  const playerData = getPlayerData(globalBattleState)
  const rivalData = getRivalData(globalBattleState)
  console.log("BATTLESTATE GLOBAL: ", globalBattleState);
  console.log("PLAYER: ", playerData)
  console.log("RIVAL: ", rivalData)
  const battleText = useRef("a")

  useEffect(() => {
    battleText.current = isPlayersTurn(globalBattleState) ? "Es tu turno" : "Esperando al rival"
  }, [])
  

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <nav className="h-screen w-[15%] flex flex-col items-center justify-center gap-2 p-2">
        {playerData!.team.map((pokemon) => (
          <Minicard pokemon={pokemon}></Minicard>
        ))}
      </nav>
      <main className="flex flex-col h-full w-[70%] bg-transparent">
        <div
          style={{ backgroundImage: `url(${background})` }}
          className="w-full flex h-full justify-between bg-no-repeat bg-cover"
        >
          <Stage view="player" />
          <Stage view="rival" />
        </div>
        <ActionsMenu text={battleText.current}/>
      </main>
      <nav className="h-screen w-[15%] flex flex-col items-center justify-center gap-2 p-2">
        {rivalData!.team.map((pokemon) => (
          <Minicard pokemon={pokemon}></Minicard>
        ))}
      </nav>
    </div>
  );
};

export default BattleWrapper;
