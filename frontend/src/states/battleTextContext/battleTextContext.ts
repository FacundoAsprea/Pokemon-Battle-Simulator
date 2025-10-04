import { create } from "zustand";

interface BattleTextContextType {
  battleText: string;
  setBattleText: (state: string) => void;
}

export const useBattleText = create<BattleTextContextType>((set) => ({
  battleText: "",
  setBattleText: (state) => set({ battleText: state }),
}));
