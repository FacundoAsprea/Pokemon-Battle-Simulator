import playerTile from "@/assets/images/player_tile.png"
import rivalTile from "@/assets/images/rival_tile.png"
interface props {
  view: "player" | "rival";
}
const Stage = ({ view }: props) => {
  const viewStyle = {
    player: "end",
    rival: "start",
  };
  const viewTile = {
    player: playerTile,
    rival: rivalTile
  }
  return (
    <div
      className="flex flex-col h-[60%] w-[40%] relative border-1 border-orange-400"
      style={{ alignSelf: viewStyle[view] }}
    >
      <div className="h-min w-full absolute bottom-0">
        <img src={viewTile[view]} className="w-full"></img>
      </div>
    </div>
  );
};

export default Stage;
