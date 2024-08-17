import { produce } from "immer";
import { create } from "zustand";
import { createSelectors } from "../utils/createSelectors";

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summery: () => number;
};

export const useCatStore = createSelectors(
  create<TCatStoreState>()((set, get) => ({
    cats: { bigCats: 0, smallCats: 0 },
    increaseBigCats: () =>
      set(
        produce((state) => {
          state.cats.bigCats += 1;
        })
      ),
    increaseSmallCats: () =>
      set(
        produce((state) => {
          state.cats.smallCats += 1;
        })
      ),
    summery: () => {
      return get().cats.bigCats + get().cats.smallCats;
    },
  }))
);

