import { useState } from "react";

//ui
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import Selector from "./selector";

//funcs
import { getPlayerData } from "@/game/functions/getters";
import { swapPokemon } from "@/game/logic/swapPokemon";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";
import { useUserHasPlayed } from "@/states/userHasPlayed/userHasPlayedState";
import MovesSelector from "./moveButton";
import { useGlobalBattleState } from "@/states/battleContext/globalBattleState";

interface props {
  variant: "ATACAR" | "CAMBIAR";
}
const ActionsButton = ({ variant }: props) => {
  const [open, setOpen] = useState(false);
  const { userHasPlayed, setUserHasPlayed } = useUserHasPlayed();
  const { setBattleText } = useBattleText();

  const playerData = useGlobalBattleState((state) =>
    getPlayerData(state.globalBattleState)
  );
  if (!playerData) return "ERROR AL OBTENER PLAYERDATA";

  const waitForOpponent = () => {
      setUserHasPlayed(true);
      setOpen(false);
      setBattleText("Esperando al rival...");
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {variant == "ATACAR" ? (
        <>
          <DrawerTrigger asChild>
            <button
              disabled={userHasPlayed}
              className="w-full h-full border-1 border-[#202020] text-xl text-center text-white cursor-pointer hover:bg-[#303030]"
            >
              ATACAR
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <MovesSelector onClickHandler={waitForOpponent}/>
          </DrawerContent>
        </>
      ) : (
        <>
          <DrawerTrigger asChild>
            <button
              disabled={userHasPlayed}
              className="w-full h-full border-1 border-[#202020] text-xl text-center text-white cursor-pointer hover:bg-[#303030]"
            >
              CAMBIAR
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-[60dvh] grid grid-cols-3 grid-rows-2 gap-2 p-2">
              {playerData.team.map((pokemon) => (
                <Selector
                  pokemon={pokemon}
                  onClickHandler={() => {
                    if(swapPokemon(pokemon.name)) waitForOpponent()
                    }}
                />
              ))}
            </div>
          </DrawerContent>
        </>
      )}
    </Drawer>
  );
};

export default ActionsButton;
