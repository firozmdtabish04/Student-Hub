import React from "react";
import { FaClock } from "react-icons/fa";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white transition-all duration-500">
      <div className="flex flex-col items-center gap-6">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <FaClock className="text-white text-3xl animate-pulse" />
          <h1 className="text-3xl font-extrabold tracking-widest">
            ChronoFlow
          </h1>
        </div>

        {/* Elegant Loader */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-400 text-sm tracking-wide animate-pulse">
          Preparing your workspace...
        </p>

        {/* Credits */}
        <div className="mt-6 text-center text-l text-gray-500 space-y-1">
          <p>
            Idea by{" "}
            <span className="text-white font-semibold">Jeet Raaj Pati</span>
          </p>
          <p>
            Designed & Developed by{" "}
            <span className="text-white font-semibold">Tabish Firoz</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loader;
