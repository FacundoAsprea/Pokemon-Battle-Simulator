import { createContext, useState } from "react";
import type { UserBattleState } from "@/game/types";

export interface contextType {
  battleState: UserBattleState,
  setBattleState: React.Dispatch<React.SetStateAction<UserBattleState>>
}
const BattleContext = createContext<contextType | null>(null);
interface props {
  children: React.ReactNode;
}

const BattleContextProvider = ({ children }: props) => {
  const [battleState, setBattleState] = useState<UserBattleState>({
    team: [],
    name: "",
    uid: crypto.randomUUID(),
  });
  return (
    <BattleContext.Provider value={{ battleState, setBattleState }}>
      {children}
    </BattleContext.Provider>
  );
};

export { BattleContext, BattleContextProvider };
