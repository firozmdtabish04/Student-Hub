import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function FocusMode() {
  const navigate = useNavigate();

  const [focusTime, setFocusTime] = useState(25); // minutes
  const [breakTime, setBreakTime] = useState(5);

  const [time, setTime] = useState(focusTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Focus");

  const [blockUI, setBlockUI] = useState(false);

  const intervalRef = useRef(null);

  /* TIMER */
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            handleAutoSwitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  /* AUTO SWITCH */
  const handleAutoSwitch = () => {
    clearInterval(intervalRef.current);

    if (mode === "Focus") {
      setMode("Break");
      setTime(breakTime * 60);
      alert("Break time 🎉");
    } else {
      setMode("Focus");
      setTime(focusTime * 60);
      alert("Back to Focus 🚀");
    }

    setIsRunning(true);
  };

  /* FORMAT TIME */
  const formatTime = () => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* CONTROLS */
  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setMode("Focus");
    setTime(focusTime * 60);
  };

  /* UPDATE TIME WHEN USER CHANGES INPUT */
  useEffect(() => {
    if (!isRunning) {
      setTime(mode === "Focus" ? focusTime * 60 : breakTime * 60);
    }
  }, [focusTime, breakTime]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* BLOCK NOTIFICATION OVERLAY */}
      {blockUI && (
        <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">🚫 Distraction Blocked</h2>
          <p className="opacity-70 mb-6">
            Stay focused. Notifications are paused.
          </p>
          <button
            onClick={() => setBlockUI(false)}
            className="px-6 py-2 bg-red-600 rounded-lg"
          >
            Exit Focus
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
        >
          ← Back
        </button>

        <h1 className="font-semibold">FOCUS MODE</h1>

        <button
          onClick={() => setBlockUI(true)}
          className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800"
        >
          Block
        </button>
      </div>

      {/* MAIN */}
      <div className="flex flex-col items-center justify-center h-[80vh] gap-6 px-4">
        {/* MODE */}
        <div className="text-lg opacity-70">{mode} Mode</div>

        {/* TIMER */}
        <div className="text-6xl sm:text-7xl font-mono">{formatTime()}</div>

        {/* PROGRESS */}
        <div className="w-full max-w-md h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{
              width: `${
                (time / ((mode === "Focus" ? focusTime : breakTime) * 60)) * 100
              }%`,
            }}
          />
        </div>

        {/* CONTROLS */}
        <div className="flex gap-4">
          {!isRunning ? (
            <button
              onClick={start}
              className="px-6 py-2 bg-green-600 rounded-lg active:scale-95"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pause}
              className="px-6 py-2 bg-yellow-600 rounded-lg active:scale-95"
            >
              Pause
            </button>
          )}

          <button
            onClick={reset}
            className="px-6 py-2 bg-red-600 rounded-lg active:scale-95"
          >
            Reset
          </button>
        </div>

        {/* CUSTOM TIMER INPUT */}
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          <div className="flex flex-col items-center">
            <label className="text-sm opacity-70">Focus (min)</label>
            <input
              type="number"
              value={focusTime}
              onChange={(e) => setFocusTime(Number(e.target.value))}
              className="w-20 p-2 bg-black border border-gray-600 rounded text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm opacity-70">Break (min)</label>
            <input
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              className="w-20 p-2 bg-black border border-gray-600 rounded text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusMode;
