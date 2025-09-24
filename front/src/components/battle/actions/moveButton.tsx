import { getSelectedPokemon } from "@/game/functions/getters";
import type { MoveData, Type } from "@/game/types";
import { useRef } from "react";

interface props {
  moveData: MoveData;
}

const MoveButton = ({ moveData }: props) => {
  const color: Record<Type, string> = {
    grass: "#7BB243",
    fire: "#BD370C",
    water: "#217BCB",
    ground: "#57423F",
    electric: "#F8D63A",
    rock: "#887A77",
    normal: "#DBD2CF",
    fighting: "#511011",
    flying: "#B2B2B3",
    poison: "#472172",
    bug: "#7B731B",
    ghost: "#301A8E",
    steel: "#2E3B41",
    psychic: "#B11E54",
    ice: "#5F93BB",
    dragon: "#1B0931",
    fairy: "#EEA5BF",
    dark: "#2B2A2A",
  };
  const maxPPs = useRef(moveData.pp);
  return (
    <div
      style={{ backgroundColor: color[moveData.type] }}
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
  const selectedPokemon = getSelectedPokemon("player");
  return (
    <div className="h-[40dvh] grid grid-cols-2 grid-rows-2 gap-2 p-2">
      {selectedPokemon.moveset.map((move) => (
        <MoveButton moveData={move} />
      ))}
    </div>
  );
};

export default MovesSelector;
