import { useContext } from "react";
import {
  BattleContext,
  type BattleContextType,
} from "@/contexts/battleContext";
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
import { getPlayerData } from "@/game/functions/getters";
import Selector from "./selector";
interface props {
  variant: "ATACAR" | "CAMBIAR";
}
const ActionsButton = ({ variant }: props) => {
  const { globalBattleState, setGlobalBattleState } = useContext(
    BattleContext
  ) as BattleContextType;

  const playerData = getPlayerData(globalBattleState);
  if (!playerData) return "ERROR AL OBTENER PLAYERDATA";

  return (
    <Drawer>
      {variant == "ATACAR" ? (
        <>
          <DrawerTrigger asChild>
            <button className="w-full h-full border-1 border-[#202020] text-xl text-center text-white cursor-pointer hover:bg-[#303030]">
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
            <button className="w-full h-full border-1 border-[#202020] text-xl text-center text-white cursor-pointer hover:bg-[#303030]">
              CAMBIAR
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="h-[60dvh] grid grid-cols-3 grid-rows-2 gap-2 p-2">
              {playerData.team.map((pokemon) => (
                <Selector pokemon={pokemon} />
              ))}
            </div>
          </DrawerContent>
        </>
      )}
    </Drawer>
  );
};

export default ActionsButton;
