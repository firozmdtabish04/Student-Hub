import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("");

  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="font-bold">Calculator</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-1 w-full mt-2"
      />
      <button
        onClick={calculate}
        className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
      >
        =
      </button>
    </div>
  );
}

export default Calculator;
