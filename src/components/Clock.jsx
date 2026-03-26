import React, { useEffect, useState } from "react";
import {
  faClock,
  faPlay,
  faPause,
  faRotate,
  faGlobe,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Clock() {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  const [studyTime, setStudyTime] = useState(
    Number(localStorage.getItem("studyTime")) || 0,
  );

  const [running, setRunning] = useState(false);

  const [quote, setQuote] = useState("");

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("studyHistory")) || [],
  );

  const [showPopup, setShowPopup] = useState(false);

  // 🎯 Daily Goal
  const [goal, setGoal] = useState(
    Number(localStorage.getItem("dailyGoal")) || 120,
  );

  // Quotes
  const quotes = [
    "Discipline creates freedom.",
    "Consistency beats motivation.",
    "Focus now, shine later.",
    "Winners train, losers complain.",
    "Do it even when you don’t feel like it.",
    "Small progress is still progress.",
    "Stay hard when it gets tough.",
    "Dream big, work bigger.",
    "Push yourself beyond limits.",
    "Success is built daily.",
    "Don’t stop until you’re proud.",
    "Hard work beats talent.",
    "No shortcuts, just effort.",
    "Make today count.",
    "Stay focused, stay winning.",
    "Growth begins outside comfort.",
    "Be better than yesterday.",
    "Work in silence, shine loud.",
    "Stay hungry, stay foolish.",
    "Turn pain into power.",
    "Success is a habit.",
    "Action beats overthinking.",
    "Keep going no matter what.",
    "Your future needs you.",
    "Grind now, shine later.",
    "Build discipline, not excuses.",
    "Effort never goes wasted.",
    "Focus on progress, not perfection.",
    "You are your only limit.",
    "Rise and grind.",
    "Make yourself proud.",
    "Keep pushing forward.",
    "Don’t fear failure, learn from it.",
    "Stay consistent, results will follow.",
    "Hustle in silence.",
    "Every day is a new chance.",
    "Stay committed to your goals.",
    "Turn dreams into plans.",
    "Keep your eyes on the goal.",
    "You didn’t come this far to stop.",
    "Success requires sacrifice.",
    "Work hard in silence.",
    "Push past your limits.",
    "Nothing changes if nothing changes.",
    "Be obsessed with improvement.",
    "Start now, not later.",
    "Focus on what matters.",
    "Stay disciplined every day.",
    "Keep leveling up.",
    "Win the day.",
  ];

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Study Timer
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setStudyTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  // Save studyTime
  useEffect(() => {
    localStorage.setItem("studyTime", studyTime);
  }, [studyTime]);

  // Save goal
  useEffect(() => {
    localStorage.setItem("dailyGoal", goal);
  }, [goal]);

  // Random Quote
  useEffect(() => {
    const random = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[random]);
  }, []);

  const formatTime = () =>
    time.toLocaleTimeString("en-US", {
      hour12: !is24Hour,
      timeZone: timezone,
    });

  const formatDate = () =>
    time.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: timezone,
    });

  const formatStudyTime = (seconds = studyTime) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // 🎯 Progress Calculation
  const progress = Math.min(Math.floor((studyTime / 60 / goal) * 100), 100);

  const timezones = [
    "Asia/Kolkata",
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
  ];

  // Save session
  const saveSession = () => {
    if (studyTime === 0) return;

    const today = new Date().toLocaleDateString();

    const newEntry = {
      date: today,
      minutes: Math.floor(studyTime / 60),
    };

    const updated = [...history, newEntry];
    setHistory(updated);
    localStorage.setItem("studyHistory", JSON.stringify(updated));

    setShowPopup(true);
  };

  return (
    <div className="min-h-screen px-4 py-6">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-white mb-4 flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg hover:bg-white/30"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>

      {/* GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* CLOCK CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 text-center text-white">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faClock} size="lg" />
            <button
              onClick={() => setIs24Hour(!is24Hour)}
              className="bg-white/20 px-3 py-1 rounded-lg"
            >
              {is24Hour ? "24H" : "12H"}
            </button>
          </div>

          <h1 className="text-4xl font-bold mt-6">{formatTime()}</h1>
          <p className="mt-2 text-sm opacity-80">{formatDate()}</p>

          <div className="mt-4 flex justify-center gap-2">
            <FontAwesomeIcon icon={faGlobe} />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-white/20 px-2 py-1 rounded"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz} className="text-black">
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Study Timer */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <h3>📚 Study Timer</h3>

            <p className="text-2xl mt-2 text-green-300">{formatStudyTime()}</p>

            <div className="flex justify-center gap-3 mt-3">
              <button
                onClick={() => setRunning(!running)}
                className="bg-green-500 px-4 py-1 rounded"
              >
                <FontAwesomeIcon icon={running ? faPause : faPlay} />
              </button>

              <button
                onClick={() => {
                  setRunning(false);
                  saveSession();
                  setStudyTime(0);
                }}
                className="bg-red-500 px-4 py-1 rounded"
              >
                <FontAwesomeIcon icon={faRotate} />
              </button>
            </div>
          </div>

          {/* 🎯 DAILY GOAL */}
          <div className="mt-6 bg-white/10 rounded-xl p-4">
            <h3 className="mb-2">🎯 Daily Goal</h3>

            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-full mb-3 px-2 py-1 rounded text-black"
              placeholder="Enter goal in minutes"
            />

            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  progress < 50
                    ? "bg-red-400"
                    : progress < 80
                      ? "bg-yellow-400"
                      : "bg-green-400"
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-xs mt-2 text-green-300">
              {Math.floor(studyTime / 60)} / {goal} min ({progress}%)
            </p>
          </div>
        </div>

        {/* MOTIVATION CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 text-white text-center flex flex-col justify-center">
          <h2 className="text-xl mb-4">🔥 Motivation</h2>

          <p className="italic text-yellow-300">"{quote}"</p>

          <button
            onClick={() => {
              const random = Math.floor(Math.random() * quotes.length);
              setQuote(quotes[random]);
            }}
            className="mt-4 bg-yellow-500 px-4 py-1 rounded"
          >
            New Quote
          </button>
        </div>

        {/* ANALYTICS CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 text-white">
          <h2 className="text-xl mb-4">📊 Study Analytics</h2>

          {history.length === 0 ? (
            <p className="text-center text-sm opacity-70 mt-10">
              No study data yet 📭 <br />
              Start timer and click reset!
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={history.slice(-5)}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} min`} />
                <Bar dataKey="minutes" />
              </BarChart>
            </ResponsiveContainer>
          )}

          <p className="text-xs mt-2 opacity-70">Last 5 sessions (minutes)</p>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black p-6 rounded-xl text-center">
            <h2 className="text-xl font-bold">🎉 Session Complete!</h2>

            <p className="mt-2">You studied:</p>

            <p className="text-2xl text-green-600 mt-2">{formatStudyTime()}</p>

            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-1 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* BACKGROUND */}
      <style>
        {`
        body {
          background: linear-gradient(270deg, #1e3a8a, #9333ea, #0f172a);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>
    </div>
  );
}

export default Clock;
