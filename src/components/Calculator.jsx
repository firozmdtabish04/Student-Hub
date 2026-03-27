import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Calculator() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [scientific, setScientific] = useState(true);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("calc_history")) || [];
    setHistory(saved);
  }, []);

  const saveHistory = (exp, result) => {
    const newHistory = [{ exp, result }, ...history].slice(0, 15);
    setHistory(newHistory);
    localStorage.setItem("calc_history", JSON.stringify(newHistory));
  };

  const factorial = (n) => {
    if (n < 0) return "Error";
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };

  const handleClick = (value) => {
    try {
      if (value === "C") return setInput("");
      if (value === "⌫") return setInput(input.slice(0, -1));

      if (value === "=") {
        let exp = input.replace(/π/g, Math.PI).replace(/e/g, Math.E);
        const result = eval(exp).toString();
        saveHistory(input, result);
        setInput(result);
        return;
      }

      if (value === "sin") return setInput(Math.sin(eval(input)).toString());
      if (value === "cos") return setInput(Math.cos(eval(input)).toString());
      if (value === "tan") return setInput(Math.tan(eval(input)).toString());
      if (value === "log") return setInput(Math.log10(eval(input)).toString());
      if (value === "ln") return setInput(Math.log(eval(input)).toString());
      if (value === "√") return setInput(Math.sqrt(eval(input)).toString());
      if (value === "x²") return setInput(Math.pow(eval(input), 2).toString());
      if (value === "x!") return setInput(factorial(eval(input)).toString());

      if (value === "π") return setInput(input + Math.PI);
      if (value === "e") return setInput(input + Math.E);

      setInput(input + value);
    } catch {
      setInput("Error");
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!isNaN(e.key) || "+-*/.%()".includes(e.key)) {
        setInput((prev) => prev + e.key);
      } else if (e.key === "Enter") handleClick("=");
      else if (e.key === "Backspace") handleClick("⌫");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [input]);

  const basic = [
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

  const sci = ["sin", "cos", "tan", "log", "ln", "√", "x²", "x!", "π", "e"];

  return (
    <div
      className={`${dark ? "bg-black text-white" : "bg-gray-100 text-black"} min-h-screen`}
    >
      {/* HEADER */}
      <div className="flex flex-wrap gap-2 justify-between items-center px-4 py-3 border-b border-gray-700">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-1 border rounded"
        >
          ← Back
        </button>

        <h1 className="font-semibold text-sm sm:text-base">
          SCIENTIFIC CALCULATOR
        </h1>

        <button
          onClick={() => setDark(!dark)}
          className="px-3 py-1 border rounded"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      {/* MAIN */}
      {/* MAIN */}
      <div className="flex justify-center items-start px-4 py-6">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 justify-center">
          {/* CALCULATOR */}
          <div
            className={`${dark ? "bg-[#0d0d0d]" : "bg-white"} 
      w-full lg:w-[380px] 
      p-4 sm:p-5 
      rounded-2xl shadow-xl border`}
          >
            {/* DISPLAY */}
            <div className="bg-black text-white p-4 rounded-lg mb-4 text-right text-2xl font-mono overflow-x-auto">
              {input || "0"}
            </div>

            {/* SCIENTIFIC */}
            {scientific && (
              <div className="grid grid-cols-5 gap-2 mb-3">
                {sci.map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleClick(btn)}
                    className="bg-purple-600 hover:bg-purple-500 p-2 rounded-lg transition active:scale-90"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            )}

            {/* BASIC */}
            <div className="grid grid-cols-4 gap-3">
              {basic.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleClick(btn)}
                  className={`
              h-14 rounded-lg text-lg transition active:scale-90
              ${
                btn === "="
                  ? "bg-green-600 hover:bg-green-500 col-span-2"
                  : btn === "C"
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-gray-800 hover:bg-gray-700"
              }
            `}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* HISTORY */}
          <div
            className={`${dark ? "bg-[#0d0d0d]" : "bg-white"} 
      w-full lg:w-[320px] 
      p-4 rounded-2xl border shadow-xl`}
          >
            <h2 className="font-semibold mb-3">History</h2>

            {history.length === 0 ? (
              <p className="text-sm opacity-60">No history</p>
            ) : (
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {history.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setInput(item.result)}
                    className="p-2 rounded-lg cursor-pointer hover:bg-gray-500/20 transition"
                  >
                    <div className="text-xs opacity-70 break-all">
                      {item.exp}
                    </div>
                    <div className="text-lg">{item.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
