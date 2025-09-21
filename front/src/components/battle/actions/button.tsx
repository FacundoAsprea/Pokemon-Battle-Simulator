import { useState } from "react";

//ui
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerHeader,
  DrawerFooter,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import Selector from "./selector";

//funcs
import { getPlayerData } from "@/game/functions/getters";
import { swapPokemon } from "@/game/logic/swapPokemon";
import type { PokemonBattleData } from "@/game/types";
import { useBattleText } from "@/states/battleTextContext/battleTextContext";

interface props {
  userHasPlayedState: [
    userHasPlayed: boolean,
    setUserHasPlayed: React.Dispatch<React.SetStateAction<boolean>>
  ];
  variant: "ATACAR" | "CAMBIAR";
}
const ActionsButton = ({variant, userHasPlayedState }: props) => {
  const [open, setOpen] = useState(false);
  const [userHasPlayed, setUserHasPlayed] = userHasPlayedState;
  const {setBattleText} = useBattleText();

  const playerData = getPlayerData();
  if (!playerData) return "ERROR AL OBTENER PLAYERDATA";

  const handleSwap = (pokemon: PokemonBattleData) => {
    if (swapPokemon(pokemon.name)) {
      setUserHasPlayed(true);
      setOpen(false);
      setBattleText("Esperando al rival...")
    }
  };

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
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose></DrawerClose>
            </DrawerFooter>
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
                  onClickHandler={() => handleSwap(pokemon)}
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
