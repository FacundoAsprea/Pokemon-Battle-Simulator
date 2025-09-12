import { useContext } from "react";
import playerTile from "@/assets/images/player_tile.png"
import rivalTile from "@/assets/images/rival_tile.png"
import { BattleContext, type BattleContextType } from "@/contexts/battleContext";
import { getSelectedPokemon } from "@/game/functions/getSelectedPokemons";
interface props {
  view: "player" | "rival";
}
const Stage = ({ view }: props) => {
  const { globalBattleState } = useContext(BattleContext) as BattleContextType
  const viewStyle = {
    player: {
      align: "end",
      tile: playerTile,
      margin: "0px",
      pokemonSprite: getSelectedPokemon("player", globalBattleState!)
    },
    rival: {
      align: "start",
      tile: rivalTile,
      margin: "0px",
      pokemonSprite: getSelectedPokemon("rival", globalBattleState!)
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-end h-[60%] w-[40%] relative border-1 border-orange-400"
      style={{ alignSelf: viewStyle[view].align }}
    >
      <div className="h-min w-full absolute bottom-0">
        <img src={viewStyle[view].tile} className="w-full"></img>
      </div>
        <img style={{marginBottom: viewStyle[view].margin}} className="h-full z-10 h-min scale-150" src={viewStyle[view].pokemonSprite}/>
    </div>
  );
};

export default Stage;
