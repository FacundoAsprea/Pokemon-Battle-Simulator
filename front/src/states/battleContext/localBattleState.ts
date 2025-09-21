import { create } from "zustand";
import type { LocalBattleStateType } from "./battleContextTypes";

const uid = crypto.randomUUID();
localStorage.setItem("uid", uid);

export const useLocalBattleState = create<LocalBattleStateType>((set) => ({
  localBattleState: {
    team: [],
    name: "",
    uid: uid,
  },
  setLocalBattleState: (state) => set({ localBattleState: state }),
}));
