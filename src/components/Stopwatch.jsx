import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Stopwatch() {
  const navigate = useNavigate();

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  // FORMAT
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}.${String(milliseconds).padStart(2, "0")}`;
  }, []);

  // CONTROLS
  const handleStartPause = () => setIsRunning((p) => !p);

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    clearInterval(intervalRef.current);
  };

  const handleLap = () => {
    if (isRunning) setLaps((prev) => [time, ...prev]);
  };

  // TIMER
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
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="text-xs sm:text-sm px-2 sm:px-4 py-1.5 sm:py-2 border rounded-lg hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>

        <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-wide">
          STOPWATCH
        </h1>

        <div className="w-[50px] sm:w-[80px]" />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 py-4">
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl text-center">
          {/* TIME */}
          <div className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono tracking-widest mb-6 sm:mb-8">
            {formatTime(time)}
          </div>

          {/* CONTROLS */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={handleStartPause}
              className="text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 border rounded-lg sm:rounded-xl hover:bg-white hover:text-black transition"
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={handleLap}
              disabled={!isRunning}
              className="text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 border rounded-lg sm:rounded-xl disabled:opacity-30 hover:bg-white hover:text-black transition"
            >
              Lap
            </button>

            <button
              onClick={handleReset}
              className="text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 border rounded-lg sm:rounded-xl hover:bg-white hover:text-black transition"
            >
              Reset
            </button>
          </div>

          {/* LAPS */}
          <div className="max-h-48 sm:max-h-60 overflow-y-auto text-xs sm:text-sm">
            {laps.length === 0 ? (
              <p className="text-gray-500 text-sm">No laps recorded</p>
            ) : (
              <div className="space-y-2">
                {laps.map((lap, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-gray-800 rounded-lg px-3 py-2"
                  >
                    <span className="text-gray-400">
                      Lap {laps.length - index}
                    </span>
                    <span className="font-mono">{formatTime(lap)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  );
}

export default Stopwatch;
