import { create } from "zustand";
import type { GlobalBattleStateType } from "./battleContextTypes";

export const useGlobalBattleState = create<GlobalBattleStateType>((set) => ({
  globalBattleState: {
    usersdata: [
      {
        team: [],
        uid: "",
        name: "",
      },
      {
        team: [],
        uid: "",
        name: "",
      },
    ],
    battledata: {
      turn: "",
    },
  },
  setGlobalBattleState: (state) => set({ globalBattleState: state }),
}));
