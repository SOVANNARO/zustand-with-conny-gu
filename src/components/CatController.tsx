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
