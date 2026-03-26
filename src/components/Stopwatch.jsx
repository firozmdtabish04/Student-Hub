import { useState, useRef } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="font-bold">Stopwatch</h2>
      <p className="text-xl">{time}s</p>
      <div className="space-x-2 mt-2">
        <button
          onClick={start}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Start
        </button>
        <button
          onClick={stop}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Stop
        </button>
        <button
          onClick={reset}
          className="bg-gray-500 text-white px-2 py-1 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Stopwatch;
