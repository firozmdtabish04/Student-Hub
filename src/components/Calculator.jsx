import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Calculator() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "⌫") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    "C",
    "⌫",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="text-lg font-semibold tracking-wide">CALCULATOR</h1>

        {/* RIGHT BUTTON (optional like calendar "All Tasks") */}
        <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition">
          History
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex items-center justify-center mt-10">
        {/* CARD */}
        <div className="w-[340px] bg-[#0d0d0d] rounded-2xl shadow-xl p-5 border border-gray-800">
          {/* DISPLAY */}
          <div className="bg-black border border-gray-700 rounded-lg p-4 mb-4 text-right text-2xl font-mono overflow-x-auto">
            {input || "0"}
          </div>

          {/* BUTTON GRID */}
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={() => handleClick(btn)}
                className={`
                  h-14 rounded-lg text-lg font-medium transition-all
                  ${
                    btn === "="
                      ? "bg-green-600 hover:bg-green-500 text-white col-span-2"
                      : btn === "C"
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-[#111] hover:bg-[#1a1a1a] border border-gray-700"
                  }
                `}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
