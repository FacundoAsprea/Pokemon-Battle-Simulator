import { Progress } from "@/components/ui/progress";
import type { PokemonBattleData } from "@shared/types/battledata";
import { capitalize } from "@/utils/functions";
interface props {
  pokemon: PokemonBattleData;
  onClickHandler: () => void
}

const Selector = ({ pokemon, onClickHandler }: props) => {
  const healthPercentage =
    (pokemon.stats.hp.current_value / pokemon.stats.hp.base_stat) * 100;
  return (
    <div onClick={onClickHandler} className="flex flex-row border-1 border-gray-500 rounded-sm px-5 hover:bg-[#303030] cursor-pointer">
      <div className="h-full w-1/2 flex justify-center">
        <img
          className="object-cover h-full"
          src={pokemon.sprites.front_default}
        ></img>
      </div>
      <div className="flex flex-col w-1/2 py-3 px-8">
        <h3 className="text-white">{capitalize(pokemon.name)}</h3>
        <div className="w-full flex flex-col px-2 pb-2 rounded-md bg-[#181818]">
          <h5 className="text-white text-sm mt-2">
            HP {pokemon.stats.hp.current_value}/{pokemon.stats.hp.base_stat}
          </h5>
          <Progress value={healthPercentage} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Selector;
