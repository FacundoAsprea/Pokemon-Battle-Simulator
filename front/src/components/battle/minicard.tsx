import type { PokemonBattleData } from "@/game/types";
import {
  HoverCardTrigger,
  HoverCard,
  HoverCardContent,
} from "../ui/hover-card";
import PokemonInfoDiplayer from "./pokemonInfoDisplayer";

interface props {
  pokemon: PokemonBattleData;
}

const Minicard = ({ pokemon }: props) => {
  const opacity = pokemon.selected ? "" : "50%";
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div
          style={{ opacity: opacity }}
          className="w-full h-[100px] bg-[#303030] rounded-sm border-[#505050] grid place-items-center !z-200"
        >
          <img src={pokemon.sprites.front_default}></img>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="!z-200" asChild>
        <PokemonInfoDiplayer pokemonData={pokemon} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default Minicard;
