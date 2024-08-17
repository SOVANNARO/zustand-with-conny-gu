import { useCatStore } from "../stores/useCatStore";

const CatBox2 = () => {
  const { cats } = useCatStore();
  return (
    <div>
      <h1>Partial States from catStore</h1>
      <p>Big Cats: {cats.bigCats}</p>
      <p>{Math.random()}</p>
    </div>
  );
};

export default CatBox2;
