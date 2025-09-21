import { useState } from "react";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";
import ActionsButton from "./button";

const ActionsMenu = () => {
  const [userHasPlayed, setUserHasPlayed] = useState(false);

  const {battleText} = useBattleText()
  return (
    <div className="bg-[#252525] w-full flex flex-col h-[40%] z-3">
      <div className="text-white text-md h-[35%]">{battleText}</div>
      <div className="flex h-[65%]">
        <ActionsButton
          variant="ATACAR"
          userHasPlayedState={[userHasPlayed, setUserHasPlayed]}
        ></ActionsButton>
        <ActionsButton
          variant="CAMBIAR"
          userHasPlayedState={[userHasPlayed, setUserHasPlayed]}
        ></ActionsButton>
      </div>
    </div>
  );
};

export default ActionsMenu;
