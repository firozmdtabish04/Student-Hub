import { useState, useRef } from "react";

function Pomodoro() {
  const [time, setTime] = useState(1500);
  const intervalRef = useRef(null);

  const start = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(1500);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="font-bold">Pomodoro</h2>
      <p className="text-xl">
        {Math.floor(time / 60)}:{time % 60}
      </p>
      <button
        onClick={start}
        className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
      >
        Start
      </button>
      <button
        onClick={reset}
        className="bg-gray-500 text-white px-2 py-1 rounded mt-2 ml-2"
      >
        Reset
      </button>
    </div>
  );
}

export default Pomodoro;
