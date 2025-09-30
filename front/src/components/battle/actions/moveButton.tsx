import { getSelectedPokemon } from "@/game/functions/getters";
import { executeAttack } from "@/game/logic/executeAttack";
import type { MoveData } from "@/game/types";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { useRef } from "react";
import { TypeUICollection } from "@/assets/typeSprites";

interface props {
  moveData: MoveData;
}

const MoveButton = ({ moveData }: props) => {
  const maxPPs = useRef(moveData.pp);
  return (
    <div
      onClick={() => executeAttack(moveData)}
      style={{ backgroundColor: TypeUICollection[moveData.type].color }}
      className="w-full h-full p-3 flex flex-col items-center justify-center rounded-sm hover:opacity-75 cursor-pointer"
    >
      <p className="text-gray-200">{moveData.name}</p>
      <p className="text-gray-200">
        {moveData.pp} / {maxPPs.current}
      </p>
    </div>
  );
};

const MovesSelector = () => {
  const selectedPokemon = useGlobalBattleState((state) =>
    getSelectedPokemon("player", state.globalBattleState)
  );
  return (
    <div className="h-[40dvh] grid grid-cols-2 grid-rows-2 gap-2 p-2">
      {selectedPokemon.moveset.map((move) => (
        <MoveButton moveData={move} />
      ))}
    </div>
  );
};

export default MovesSelector;
