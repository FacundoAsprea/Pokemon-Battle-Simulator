import type { PokemonBattleData } from "@shared/types/battledata";
import { capitalize } from "@/utils/functions";
import { TypeUICollection } from "@/assets/typeSprites";

interface props {
  pokemonData: PokemonBattleData;
}
const StatDisplayer = ({ stat }: { stat: number }) => {
  return <strong className="p-1 bg-white rounded-sm text-black">{stat}</strong>;
};
const PokemonInfoDiplayer = ({ pokemonData }: props) => {
  const { name, stats } = pokemonData;
  return (
    <div className="flex !z-200 rounded-lg bg-[#202020] text-gray-400 w-full border-1 border-gray-500">
      <div className="flex flex-col h-full border-r-1 border-gray-500 my-3 p-2 gap-y-2">
        <p>{capitalize(name)}</p>
        <p className="flex gap-2">
          Tipos:{" "}
          {pokemonData.types.map((type) => (
            <img
              className="object-contain"
              src={TypeUICollection[type.name].sprite}
            ></img>
          ))}
        </p>
        <ul>
          <li>
            HP: <StatDisplayer stat={stats.hp.current_value} />
          </li>
          <li>
            Velocidad: <StatDisplayer stat={stats.speed.current_value} />
          </li>
          <li>
            Ataque: <StatDisplayer stat={stats.attack.current_value} />
          </li>
          <li>
            Ataque Especial:{" "}
            <StatDisplayer stat={stats.special_attack.current_value} />
          </li>
          <li>
            Defensa: <StatDisplayer stat={stats.defense.current_value} />
          </li>
          <li>
            Defensa Especial:{" "}
            <StatDisplayer stat={stats.special_defense.current_value} />
          </li>
        </ul>
      </div>
      <div className="flex flex-col h-full justify-center items-center p-3">
        {pokemonData.types.map((type) => (
          <div className="flex flex-col h-1/2 mb-10">
            <p className="flex text-xs gap-1">
              Debilidades de {capitalize(type.name)}
            </p>
            <div className="flex flex-wrap w-full">
              {type.damage_relations.double_damage_from.map((weakness) => (
                <img
                  className="object-fit"
                  src={TypeUICollection[weakness].sprite}
                ></img>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonInfoDiplayer;
