import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Clock() {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  // LIVE CLOCK
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // FORMATTERS
  const formattedTime = useMemo(() => {
    return time.toLocaleTimeString("en-US", {
      hour12: !is24Hour,
    });
  }, [time, is24Hour]);

  const formattedDate = useMemo(() => {
    return time.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [time]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="text-sm sm:text-base border px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>

        <h1 className="text-sm sm:text-lg md:text-xl font-semibold tracking-wide">
          ENTERPRISE CLOCK
        </h1>

        <button
          onClick={() => setIs24Hour(!is24Hour)}
          className="text-sm sm:text-base border px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          {is24Hour ? "24H" : "12H"}
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center px-4">
        {/* CARD */}
        <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 text-center">
          {/* TIME */}
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono tracking-widest mb-6">
            {formattedTime}
          </div>

          {/* DATE */}
          <div className="text-sm sm:text-base md:text-lg text-gray-400">
            {formattedDate}
          </div>

          {/* DIVIDER */}
          <div className="mt-6 border-t border-gray-800" />

          {/* FOOTER INFO */}
          <div className="mt-4 text-xs sm:text-sm text-gray-500">
            System Time • Auto Synced
          </div>
        </div>
      </div>

      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  );
}

export default Clock;
