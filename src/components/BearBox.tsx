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
