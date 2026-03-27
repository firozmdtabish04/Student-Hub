import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Alarm() {
  const navigate = useNavigate();

  const loadAlarms = () => {
    try {
      return JSON.parse(localStorage.getItem("alarms")) || [];
    } catch {
      return [];
    }
  };

  const [alarms, setAlarms] = useState(loadAlarms);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [repeat, setRepeat] = useState("once");

  const [now, setNow] = useState(new Date());
  const [triggered, setTriggered] = useState(null);

  const audioRef = useRef(null);

  // 🕒 Live Time
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // 🔔 Notification Permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // 💾 Save
  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  // ⏰ Alarm Check
  useEffect(() => {
    const interval = setInterval(() => {
      const nowTime = new Date().toTimeString().slice(0, 5);

      alarms.forEach((a) => {
        if (!a.active) return;

        if (a.time === nowTime) {
          setTriggered(a);

          if (Notification.permission === "granted") {
            new Notification("⏰ Alarm!", { body: a.time });
          }

          audioRef.current?.play();

          setAlarms((prev) =>
            prev.map((x) =>
              x.id === a.id ? { ...x, active: a.repeat !== "once" } : x,
            ),
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  // ➕ Add Alarm
  const addAlarm = () => {
    if (!time) return;

    setAlarms((prev) => [
      {
        id: Date.now(),
        time,
        date,
        repeat,
        active: true,
      },
      ...prev,
    ]);

    setTime("");
    setDate("");
  };

  // ❌ Delete
  const remove = (id) => setAlarms((p) => p.filter((a) => a.id !== id));

  // 🔄 Toggle
  const toggle = (id) =>
    setAlarms((p) =>
      p.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );

  // 🛑 Stop Alarm
  const stop = () => {
    setTriggered(null);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  // 🌙 Sleep Analytics
  const sleep = () => {
    if (!time) return null;
    const now = new Date();
    const [h, m] = time.split(":");

    const alarm = new Date();
    alarm.setHours(h, m, 0);

    if (alarm < now) alarm.setDate(alarm.getDate() + 1);

    return ((alarm - now) / 3600000).toFixed(1);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" />
      </audio>

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 py-2 rounded"
        >
          ← Back
        </button>

        <h1 className="text-xl font-semibold">SMART ALARM</h1>

        <div className="text-sm text-gray-400">{now.toLocaleTimeString()}</div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          {/* INPUTS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {/* TIME */}
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-black border border-gray-500 text-white px-3 py-2 rounded
              w-full [color-scheme:dark]"
            />

            {/* DATE */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-black border border-gray-500 text-white px-3 py-2 rounded
              w-full [color-scheme:dark]"
            />

            {/* CUSTOM DROPDOWN */}
            <div className="relative">
              <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className="w-full bg-black text-white border border-gray-500 px-3 py-2 rounded appearance-none"
              >
                <option value="once">Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>

              <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* SLEEP */}
          {sleep() && (
            <p className="text-center text-gray-400 mb-3">
              😴 Sleep: {sleep()} hrs
            </p>
          )}

          {/* ADD BUTTON */}
          <button
            onClick={addAlarm}
            className="w-full border py-2 rounded hover:bg-white hover:text-black mb-4"
          >
            Add Alarm
          </button>

          {/* LIST */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {alarms.length === 0 && (
              <p className="text-center text-gray-500">No alarms</p>
            )}

            {alarms.map((a) => (
              <div
                key={a.id}
                className={`flex justify-between items-center px-3 py-2 rounded border
                ${a.active ? "border-green-500" : "border-gray-800"}`}
              >
                <span>
                  {a.time} • {a.repeat}
                </span>

                <div className="flex gap-2">
                  <button onClick={() => toggle(a.id)}>
                    {a.active ? "ON" : "OFF"}
                  </button>

                  <button onClick={() => remove(a.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP */}
      {triggered && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white text-black rounded-3xl p-8 w-[90%] max-w-sm text-center shadow-2xl animate-scaleIn">
            {/* ICON */}
            <div className="text-5xl mb-4 animate-pulse">⏰</div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold mb-2">Alarm Ringing</h2>

            {/* TIME */}
            <p className="text-lg font-mono mb-6">{triggered.time}</p>

            {/* ACTIONS */}
            <div className="flex gap-3 justify-center">
              {/* STOP */}
              <button
                onClick={stop}
                className="flex-1 bg-black text-white py-2 rounded-xl hover:opacity-80 transition"
              >
                Stop
              </button>

              {/* SNOOZE */}
              <button
                onClick={() => {
                  stop();

                  // add snooze (5 min later)
                  const [h, m] = triggered.time.split(":");
                  const snooze = new Date();
                  snooze.setHours(h, m);
                  snooze.setMinutes(snooze.getMinutes() + 5);

                  const newTime = snooze.toTimeString().slice(0, 5);

                  setAlarms((prev) => [
                    {
                      id: Date.now(),
                      time: newTime,
                      repeat: "once",
                      active: true,
                    },
                    ...prev,
                  ]);
                }}
                className="flex-1 border border-black py-2 rounded-xl hover:bg-black hover:text-white transition"
              >
                Snooze
              </button>
            </div>

            {/* FOOTER */}
            <p className="text-xs text-gray-500 mt-4">Tap Stop to dismiss</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alarm;
