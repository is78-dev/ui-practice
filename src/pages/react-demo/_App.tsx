import { useState } from "react";

const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">カウンター</h2>
        <div className="text-center text-xl">{count}</div>
        <div className="grid gap-4 grid-cols-3">
          <button
            onClick={() => {
              setCount((c) => c - 1);
            }}
            className="block p-4 border"
          >
            -1
          </button>
          <button onClick={() => setCount(0)} className="block p-4 border">
            0
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="block p-4 border"
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
