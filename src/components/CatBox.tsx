import { useCatStore } from "../stores/useCatStore";

const CatBox = () => {
  const { cats, increaseBigCats, increaseSmallCats } = useCatStore();

  return (
    <div>
      <h1>Cat Box</h1>
      <p>Big cats: {cats.bigCats}</p>
      <p>Small cats: {cats.smallCats}</p>
      <p>{Math.random()}</p>
      <div>
        <button onClick={increaseBigCats}>Add big cat</button>
        <button onClick={increaseSmallCats}>Add small cat</button>
      </div>
    </div>
  );
};

export default CatBox;
