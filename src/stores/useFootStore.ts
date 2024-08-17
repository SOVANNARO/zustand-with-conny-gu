import { create } from "zustand";

type TFoodStoreState = {
  fish: number;
  addOneFish: () => void;
  removeOneFish: () => void;
  removeAllFish: () => void;
};

export const useFootStore = create<TFoodStoreState>()((set) => ({
  fish: 0,
  addOneFish: () => set((state) => ({ fish: state.fish + 1 })),
  removeOneFish: () => set((state) => ({ fish: state.fish - 1 })),
  removeAllFish: () => set({ fish: 0 }),
}));
