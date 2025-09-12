import type { PokemonBattleData } from "@/game/types";

interface props {
  pokemon: PokemonBattleData;
}

const Minicard = ({ pokemon }: props) => {
  const opacity = pokemon.selected ? "" : "50%";
  return (
    <div
      style={{ opacity: opacity }}
      className="w-full h-[100px] bg-[#303030] rounded-sm border-[#505050] grid place-items-center"
    >
      <img src={pokemon.sprites.front_default}></img>
    </div>
  );
};

export default Minicard;
