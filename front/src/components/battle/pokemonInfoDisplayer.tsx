import type { PokemonBattleData } from "@/game/types";
import { capitalize } from "@/utils/functions";

interface props {
  pokemonData: PokemonBattleData;
}
const StatDisplayer = ({ stat }: { stat: number }) => {
  return <strong className="p-1 bg-white rounded-sm text-black">{stat}</strong>;
};
const PokemonInfoDiplayer = ({ pokemonData }: props) => {
  const { name, stats } = pokemonData;
  return (
    <div className="flex ">
      <div className="text-gray-400 flex flex-col h-full border-r-1 border-white p-3 gap-y-2 rounded-lg bg-[#202020]">
        <p>{capitalize(name)}</p>
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
      <div className="flex flex-col h-full p-3"></div>
    </div>
  );
};

export default PokemonInfoDiplayer;
