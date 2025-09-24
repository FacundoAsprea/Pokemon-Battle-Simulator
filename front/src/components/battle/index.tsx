import { useEffect } from "react";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import Stage from "./stage";
import Minicard from "./minicard";
import ActionsMenu from "./actions/actions";

import background from "@/assets/images/background.png";
import { getPlayerData, getRivalData } from "@/game/functions/getters";
import game from "@/game/logic/gameEngine";
import Healthbar from "./healthbar";

const BattleWrapper = () => {
  const playerData = useGlobalBattleState((state) =>
    getPlayerData(state.globalBattleState)
  );
  const rivalData = useGlobalBattleState((state) =>
    getRivalData(state.globalBattleState)
  );

  useEffect(() => {
    game.runGame();
  }, []);

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
          className="w-full flex h-full justify-between bg-no-repeat bg-cover relative"
        >
          <Healthbar user="player" />
          <Stage view="player" />
          <Stage view="rival" />
          <Healthbar user="rival" />
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
