import { useState } from "react";

function Alarm() {
  const [time, setTime] = useState("");

  const setAlarm = () => {
    setInterval(() => {
      const now = new Date().toTimeString().slice(0, 5);
      if (now === time) {
        alert("⏰ Alarm!");
      }
    }, 1000);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <h2 className="font-bold">Alarm</h2>
      <input
        type="time"
        onChange={(e) => setTime(e.target.value)}
        className="border p-1 mt-2"
      />
      <button
        onClick={setAlarm}
        className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
      >
        Set
      </button>
    </div>
  );
}

export default Alarm;
