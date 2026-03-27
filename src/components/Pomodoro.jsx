import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Pomodoro() {
  const navigate = useNavigate();

  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const [time, setTime] = useState(workTime * 60);
  const [running, setRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);

  const intervalRef = useRef(null);

  // FORMAT
  const formatTime = useCallback((t) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  // TIMER
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            const next = !isWork;
            setIsWork(next);
            return next ? workTime * 60 : breakTime * 60;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running, isWork, workTime, breakTime]);

  // RESET
  const handleReset = () => {
    setRunning(false);
    setIsWork(true);
    setTime(workTime * 60);
    clearInterval(intervalRef.current);
  };

  // SETTINGS CHANGE
  useEffect(() => {
    if (!running) {
      setTime(isWork ? workTime * 60 : breakTime * 60);
    }
  }, [workTime, breakTime, isWork, running]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 sm:px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>

        <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-wide">
          POMODORO
        </h1>

        <div className="text-xs sm:text-sm text-gray-400">
          {isWork ? "FOCUS" : "BREAK"}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10">
          {/* MODE */}
          <div className="text-gray-400 text-sm mb-4 tracking-wider">
            {isWork ? "Focus Time" : "Relax Time"}
          </div>

          {/* TIMER */}
          <div className="text-5xl sm:text-7xl md:text-8xl font-mono tracking-widest mb-8">
            {formatTime(time)}
          </div>

          {/* SETTINGS */}
          <div className="flex gap-6 justify-center flex-wrap mb-8">
            <div className="text-left">
              <label className="text-xs text-gray-400">Work</label>
              <input
                type="number"
                value={workTime}
                onChange={(e) => setWorkTime(Number(e.target.value))}
                className="block w-20 mt-1 px-2 py-1 bg-black border border-gray-700 rounded focus:outline-none focus:border-white"
              />
            </div>

            <div className="text-left">
              <label className="text-xs text-gray-400">Break</label>
              <input
                type="number"
                value={breakTime}
                onChange={(e) => setBreakTime(Number(e.target.value))}
                className="block w-20 mt-1 px-2 py-1 bg-black border border-gray-700 rounded focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setRunning((p) => !p)}
              className="px-6 py-2 border rounded-lg hover:bg-white hover:text-black transition"
            >
              {running ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleReset}
              className="px-6 py-2 border rounded-lg hover:bg-white hover:text-black transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  );
}

export default Pomodoro;
