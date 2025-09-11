import { createContext, useState } from "react";
import type { UserBattleState, GlobalBattleState } from "@/game/types";
interface props {
  children: React.ReactNode;
}

export interface GlobalBattleStateType {
  globalBattleState: GlobalBattleState | undefined;
  setGlobalBattleState: React.Dispatch<
    React.SetStateAction<GlobalBattleState | undefined>
  >;
}
export interface LocalBattleStateType {
  localBattleState: UserBattleState;
  setLocalBattleState: React.Dispatch<React.SetStateAction<UserBattleState>>;
}
export interface BattleContextType
  extends GlobalBattleStateType,
    LocalBattleStateType {}

const BattleContext = createContext<BattleContextType | null>(null);

const BattleContextProvider = ({ children }: props) => {
  const [globalBattleState, setGlobalBattleState] =
    useState<GlobalBattleState>();
  const [localBattleState, setLocalBattleState] = useState<UserBattleState>({
    team: [],
    name: "",
    uid: crypto.randomUUID(),
  });
  localStorage.removeItem("uid")
  localStorage.setItem("uid", localBattleState.uid)

  return (
    <BattleContext.Provider
      value={{
        localBattleState: localBattleState,
        setLocalBattleState: setLocalBattleState,
        globalBattleState: globalBattleState,
        setGlobalBattleState: setGlobalBattleState
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};

export { BattleContext, BattleContextProvider };
