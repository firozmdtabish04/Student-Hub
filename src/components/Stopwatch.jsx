import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Stopwatch() {
  const navigate = useNavigate();

  // STATE
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // REF
  const intervalRef = useRef(null);

  // FORMAT TIME (mm:ss.ms)
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}.${String(milliseconds).padStart(2, "0")}`;
  }, []);

  // START / PAUSE
  const handleStartPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // RESET
  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    clearInterval(intervalRef.current);
  }, []);

  // LAP
  const handleLap = useCallback(() => {
    if (isRunning) {
      setLaps((prev) => [time, ...prev]);
    }
  }, [isRunning, time]);

  // TIMER EFFECT
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Stopwatch</h1>
        <div />
      </div>

      {/* BODY */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* TIME DISPLAY */}
        <div className="text-6xl md:text-7xl font-mono mb-10 tracking-widest">
          {formatTime(time)}
        </div>

        {/* CONTROLS */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={handleStartPause}
            className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={handleLap}
            disabled={!isRunning}
            className="px-6 py-3 border border-white rounded disabled:opacity-30 hover:bg-white hover:text-black transition"
          >
            Lap
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
          >
            Reset
          </button>
        </div>

        {/* LAPS */}
        <div className="w-full max-w-md px-4 overflow-y-auto max-h-60">
          {laps.length === 0 ? (
            <p className="text-gray-400 text-center">No laps recorded</p>
          ) : (
            laps.map((lap, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-gray-700 py-2 text-sm"
              >
                <span>Lap {laps.length - index}</span>
                <span>{formatTime(lap)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
