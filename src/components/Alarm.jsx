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

  const [triggeredAlarm, setTriggeredAlarm] = useState(null);

  const audioRef = useRef(null);

  // 🔔 Ask Notification Permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }, [alarms]);

  // ⏰ CHECK ALARMS
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      alarms.forEach((alarm) => {
        if (!alarm.active) return;

        const nowTime = now.toTimeString().slice(0, 5);
        const nowDate = now.toISOString().slice(0, 10);

        const matchTime = alarm.time === nowTime;

        let match = false;

        if (alarm.repeat === "once") {
          match = alarm.date === nowDate && matchTime;
        } else if (alarm.repeat === "daily") {
          match = matchTime;
        }

        if (match) {
          setTriggeredAlarm(alarm);

          // 🔔 Notification
          if (Notification.permission === "granted") {
            new Notification("⏰ Alarm Ringing!", {
              body: `Time: ${alarm.time}`,
            });
          }

          // 🔊 SOUND
          audioRef.current?.play();

          setAlarms((prev) =>
            prev.map((a) =>
              a.id === alarm.id ? { ...a, active: alarm.repeat !== "once" } : a,
            ),
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  // ADD ALARM
  const addAlarm = () => {
    if (!time) return;

    const newAlarm = {
      id: Date.now(),
      time,
      date,
      repeat,
      active: true,
    };

    setAlarms((prev) => [newAlarm, ...prev]);
    setTime("");
    setDate("");
  };

  // DELETE
  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  // TOGGLE
  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  };

  // 🛑 STOP ALARM
  const stopAlarm = () => {
    setTriggeredAlarm(null);
    audioRef.current?.pause();
    audioRef.current.currentTime = 0;
  };

  // 🌙 Sleep Analytics
  const sleepHours = () => {
    if (!time) return null;

    const now = new Date();
    const [h, m] = time.split(":");

    const alarmDate = new Date();
    alarmDate.setHours(h, m, 0);

    if (alarmDate < now) alarmDate.setDate(alarmDate.getDate() + 1);

    const diff = (alarmDate - now) / (1000 * 60 * 60);
    return diff.toFixed(1);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg" />
      </audio>

      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 py-2 rounded"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">SMART ALARM</h1>
        <div />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          {/* INPUT */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="px-3 py-2 bg-black border border-gray-700 rounded"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-2 bg-black border border-gray-700 rounded"
            />

            <select
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              className="px-3 py-2 bg-black border border-gray-700 rounded"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
            </select>
          </div>

          {/* 🌙 Sleep Analytics */}
          {sleepHours() && (
            <p className="text-center text-sm text-gray-400 mb-3">
              😴 You will sleep ~ {sleepHours()} hrs
            </p>
          )}

          <button
            onClick={addAlarm}
            className="w-full border py-2 rounded hover:bg-white hover:text-black mb-4"
          >
            Add Alarm
          </button>

          {/* LIST */}
          <div className="space-y-2 max-h-60 overflow-y-auto text-sm">
            {alarms.length === 0 && (
              <p className="text-gray-500 text-center">No alarms</p>
            )}

            {alarms.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-center border border-gray-800 rounded px-3 py-2"
              >
                <span>
                  {a.time} • {a.repeat}
                </span>

                <div className="flex gap-2">
                  <button onClick={() => toggleAlarm(a.id)}>
                    {a.active ? "ON" : "OFF"}
                  </button>
                  <button onClick={() => deleteAlarm(a.id)}>✕</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔔 POPUP CARD */}
      {triggeredAlarm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-black rounded-2xl p-6 text-center w-80 shadow-xl">
            <h2 className="text-xl font-bold mb-2">⏰ Alarm</h2>
            <p className="mb-4">{triggeredAlarm.time}</p>
            <button
              onClick={stopAlarm}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Stop
            </button>
          </div>
        </div>
      )}

      {/* BG */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  );
}

export default Alarm;
