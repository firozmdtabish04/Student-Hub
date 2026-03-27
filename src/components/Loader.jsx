import React from "react";
import { FaClock } from "react-icons/fa";

const credits = [
  { label: "Idea", name: "Jeet Raaj Pati" },
  { label: "Contribution", name: "Abhilipsa Pati" },
  { label: "Designed & Developed", name: "Tabish Firoz" },
];

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white transition-all duration-500">
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <FaClock className="text-blue-400 text-3xl animate-pulse" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-widest bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ChronoFlow
          </h1>
        </div>

        {/* Loader */}
        <div className="relative w-16 h-16">
          {/* Background Ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 backdrop-blur-sm"></div>

          {/* Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-blue-400 animate-spin"></div>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full blur-md bg-blue-500/20"></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-400 text-sm tracking-wide animate-pulse">
          Preparing your workspace...
        </p>

        {/* Credits */}
        <div className="mt-6 text-center text-l text-gray-500 space-y-1">
          {credits.map((item, index) => (
            <p key={index}>
              {item.label} by{" "}
              <span className="text-white font-semibold">{item.name}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loader;
