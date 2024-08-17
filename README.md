### Zustand Tutorials with Conny Gu

### 🟢 Basic Usage

`src/stores/useBearStore.tsx`

```typeScript
import { create } from "zustand";

type TBearStoreState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

export const useBearStore = create<TBearStoreState>()((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

```

`src/components/BearBox.tsx`

```typeScript
import { useBearStore } from "../stores/useBearStore";

function BearBox() {
  const { bears, increasePopulation, removeAllBears } = useBearStore();
  return (
    <div>
      <h1>Bear Box</h1>
      <p>Bears: {bears}</p>
      <div>
        <button onClick={increasePopulation}>Add Bear</button>
        <button onClick={removeAllBears}>Remove All Bear</button>
      </div>
    </div>
  );
}

export default BearBox;

```

### 🟢 get(), set() and the immer middleware

> pnpm install immer

Adding Immer to Zustand can significantly simplify state management, especially when dealing with complex or deeply nested state structures. Here are a few key reasons why you might want to use Immer with Zustand:

1. **Immutable State Management**: Immer allows you to write code that appears to mutate state directly, but it actually maintains immutability under the hood. This makes your state management more predictable and easier to debug².

2. **Simplified Updates**: With Immer, you can use familiar JavaScript syntax to update state, which can be more intuitive than manually creating new state objects. This is particularly useful for complex state updates¹.

3. **Cleaner Code**: Using Immer can reduce boilerplate code, making your state management logic cleaner and more maintainable¹.

4. **Middleware Integration**: Zustand provides an Immer middleware that integrates seamlessly, allowing you to leverage Immer's benefits without much additional setup².

Here's a simple example of how you might use Immer with Zustand:

```javascript
import create from "zustand";
import { immer } from "zustand/middleware/immer";

const useStore = create(
  immer((set) => ({
    count: 0,
    increment: () =>
      set((state) => {
        state.count += 1;
      }),
    decrement: () =>
      set((state) => {
        state.count -= 1;
      }),
  }))
);
```

`src/stores/useCatStore.tsx`

```typeScript
import { produce } from "immer";
import { create } from "zustand";

type TCatStoreState = {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summery: () => number;
};

export const useCatStore = create<TCatStoreState>()((set, get) => ({
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
}));

```

**produce** is a function from the Immer library that allows you to work with immutable state updates in a more convenient way. When you use produce, you can write your state updates as if you were directly mutating the state, but under the hood, Immer ensures that the state remains immutable.

### 🟢 Selector And Autogenerator

`src/utils/createSelectors.ts`

```typeScript
import { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <T extends object, S extends UseBoundStore<StoreApi<T>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {} as { [K in keyof T]: () => T[K] };

  for (const k of Object.keys(store.getState()) as (keyof T)[]) {
    store.use[k] = () => store((s) => s[k]);
  }

  return store;
};

```

`src/stores/useCatStore.ts`

```typeScript
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


```

`src/components/CatsController.tsx`

```typescript
import { useCatStore } from "../stores/useCatStore";

function CatController() {
  //   const { increaseBigCats, increaseSmallCats } = useCatStore();
  const increaseBigCats = useCatStore.use.increaseBigCats();
  const increaseSmallCats = useCatStore.use.increaseSmallCats();
  return (
    <div>
      <h1>Cat Controller</h1>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increaseBigCats}>Add Big Cat</button>
        <button onClick={increaseSmallCats}>Add Small Cat</button>
      </div>
    </div>
  );
}

export default CatController;
```

### 🟢 Multi States Selection and why shallow?

`src/Components/CatController.tsx`

```typeScript
import { useCatStore } from "../stores/useCatStore";
import shallow from "zustand/shallow";

function CatController() {
  //   const { increaseBigCats, increaseSmallCats } = useCatStore();
//   const increaseBigCats = useCatStore.use.increaseBigCats();
//   const increaseSmallCats = useCatStore.use.increaseSmallCats();
const [increaseBigCats, increaseSmallCats] = useCatStore(
    (state) => [state.increaseBigCats, state.increaseSmallCats],
    shallow
  );
  return (
    <div>
      <h1>Cat Controller</h1>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increaseBigCats}>Add Big Cat</button>
        <button onClick={increaseSmallCats}>Add Small Cat</button>
      </div>
    </div>
  );
}

export default CatController;

```

### 🟢 Persist Middleware
