import { create } from "zustand";

interface userHasPlayed {
  userHasPlayed: boolean;
  setUserHasPlayed: (state: boolean) => void;
}

export const useUserHasPlayed = create<userHasPlayed>((set) => ({
  userHasPlayed: false,
  setUserHasPlayed: (state) => set({ userHasPlayed: state }),
}));
