import type { GlobalBattleState } from "@/game/types";

interface props {
  view: "player" | "rival";
  battleState: GlobalBattleState
}
const Stage = ({ view }: props) => {
  const viewStyle = {
    player: "end",
    rival: "start",
  };
  return (
    <div
      className="flex bg-red-500 h-[60%] w-[40%]"
      style={{ alignSelf: viewStyle[view] }}
    ></div>
  );
};

export default Stage;
