import { getSelectedPokemon } from "@/game/functions/getters";
import { capitalize } from "@/utils/functions";

import { Progress } from "../ui/progress";
import { TypeUICollection } from "@/assets/typeSprites";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

type FlexDirection = "row-reverse" | "row"
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
      placeItems: "end",
      flexDirection: "row-reverse" as FlexDirection,
    },
    rival: {
      margin: "20px 0px",
      inset: "0px auto auto 0px",
      borderRadius: "0px 10px 10px 0px",
      borderWidth: "3px 3px 3px 0px",
      placeItems: "start",
      flexDirection: "row" as FlexDirection,
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
        <div
          style={{ placeItems: viewStyle[user].placeItems }}
          className="text-gray-100 flex flex-col"
        >
          <p
            style={{ flexDirection: viewStyle[user].flexDirection}}
            className="flex gap-2"
          >
            {capitalize(selectedPokemon.name)}{" "}
            {selectedPokemon.types.map((type) => (
              <img
                className="object-contain"
                src={TypeUICollection[type.name].sprite}
              ></img>
            ))}
          </p>
          <p className="text-sm">
            {selectedPokemon.stats.hp.current_value} /{" "}
            {selectedPokemon.stats.hp.base_stat}
          </p>
        </div>
        <Progress value={healthPercentage} />
      </div>
    </div>
  );
};

export default Healthbar;
