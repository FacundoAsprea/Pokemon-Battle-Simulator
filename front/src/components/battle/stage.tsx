import playerTile from "@/assets/images/player_tile.png"
import rivalTile from "@/assets/images/rival_tile.png"

import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";
import { getSelectedPokemonSprites } from "@/game/functions/getSelectedPokemons";

interface props {
  view: "player" | "rival";
}
const Stage = ({ view }: props) => {
  const { globalBattleState } = useGlobalBattleState()
  const viewStyle = {
    player: {
      align: "end",
      tile: playerTile,
      margin: "30px",
      pokemonSprite: getSelectedPokemonSprites("player", globalBattleState!)
    },
    rival: {
      align: "start",
      tile: rivalTile,
      margin: "40px",
      pokemonSprite: getSelectedPokemonSprites("rival", globalBattleState!)
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-end h-[60%] w-[40%] relative"
      style={{ alignSelf: viewStyle[view].align }}
    >
      <div className="h-min w-full absolute bottom-0">
        <img src={viewStyle[view].tile} className="w-full"></img>
      </div>
        <img style={{marginBottom: viewStyle[view].margin}} className="z-2 h-min scale-150" src={viewStyle[view].pokemonSprite}/>
    </div>
  );
};

export default Stage;
