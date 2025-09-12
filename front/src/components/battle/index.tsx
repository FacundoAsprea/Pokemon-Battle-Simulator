import { useContext, useState } from "react";
import { webSocket } from "@/services/websocket.service";
import { BattleContext } from "@/contexts/battleContext";
import type { BattleContextType } from "@/contexts/battleContext";
import Stage from "./stage";
import Minicard from "./minicard";
import ActionsMenu from "./actions";

import background from "@/assets/images/background.png";
import type { UserBattleState } from "@/game/types";

const BattleWrapper = () => {
  const uid = localStorage.getItem("uid");
  const [selectedPokemons, setSelectedPokemons] = useState();
  const { globalBattleState, setGlobalBattleState } = useContext(
    BattleContext
  ) as BattleContextType;
  const playerData = globalBattleState!.usersdata.find(
    (user) => user.uid === uid
  );
  const rivalData = globalBattleState!.usersdata.find(
    (user) => user.uid !== uid
  );
  console.log("BATTLESTATE GLOBAL: ", globalBattleState);

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
        <ActionsMenu />
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
