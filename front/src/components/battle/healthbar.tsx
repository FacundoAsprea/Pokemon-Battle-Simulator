import { getSelectedPokemon } from "@/game/functions/getters";
import { capitalize } from "@/utils/functions";

import { Progress } from "../ui/progress";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

interface props {
  user: "player" | "rival";
}
const Healthbar = ({ user }: props) => {
  const viewStyle = {
    player: {
      margin: "20px 0px",
      inset: "auto 0px 0px auto",
      borderRadius: "10px 0px 0px 10px",
      borderWidth: "3px 0px 3px 3px",
    },
    rival: {
      margin: "20px 0px",
      inset: "0px auto auto 0px",
      borderRadius: "0px 10px 10px 0px",
      borderWidth: "3px 3px 3px 0px",
    },
  };
  const selectedPokemon = useGlobalBattleState((state) =>
    getSelectedPokemon(user, state.globalBattleState)
  );
  const healthPercentage =
    (selectedPokemon.stats.hp.current_value /
      selectedPokemon.stats.hp.base_stat) *
    100;

  return (
    <div
      style={{
        margin: viewStyle[user].margin,
        inset: viewStyle[user].inset,
        borderRadius: viewStyle[user].borderRadius,
        borderWidth: viewStyle[user].borderWidth,
      }}
      className="absolute w-[45%] overflow-hidden border-[#404040]"
    >
      <div className="flex flex-col bg-[#303030] p-3">
        <div className="text-gray-100 flex">
          {capitalize(selectedPokemon.name)}
        </div>
        <Progress value={healthPercentage} />
      </div>
    </div>
  );
};

export default Healthbar;
