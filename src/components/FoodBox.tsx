
import { useFootStore } from "../stores/useFootStore";

function FoodBox() {
  const { fish, addOneFish, removeOneFish, removeAllFish } = useFootStore();
  return (
    <div>
      <h1>Food Box</h1>
      <p>Fish: {fish}</p>
      <button onClick={addOneFish}>Add one fish</button>
      <button onClick={removeOneFish}>Remove one fish</button>
      <button onClick={removeAllFish}>Remove all fish</button>
    </div>
  );
}

export default FoodBox;
