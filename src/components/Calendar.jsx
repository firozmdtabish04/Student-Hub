import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const navigate = useNavigate();

  const loadTodos = () => {
    try {
      return JSON.parse(localStorage.getItem("todos")) || [];
    } catch {
      return [];
    }
  };

  const [todos, setTodos] = useState(loadTodos);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [input, setInput] = useState("");
  const [showAll, setShowAll] = useState(false);

  const today = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const formatKey = (y, m, d) => `${y}-${m}-${d}`;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!input || !selectedDate) return;

    const key = formatKey(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
    );

    setTodos((prev) => [{ id: Date.now(), text: input, date: key }, ...prev]);

    setInput("");
  };

  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const selectedTasks = todos.filter(
    (t) =>
      t.date ===
      formatKey(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      ),
  );

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 border rounded-lg hover:bg-white hover:text-black transition text-sm"
        >
          ← Back
        </button>

        <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
          CALENDAR
        </h1>

        <button
          onClick={() => setShowAll(true)}
          className="px-3 py-1 border rounded-lg text-xs hover:bg-white hover:text-black"
        >
          All Tasks
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-5xl grid lg:grid-cols-3 gap-6">
          {/* CALENDAR CARD */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-6 backdrop-blur-xl">
            {/* NAV */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1))}
                className="border px-3 py-1 rounded"
              >
                ←
              </button>

              <h2 className="text-lg sm:text-xl font-semibold">
                {monthName} {year}
              </h2>

              <button
                onClick={() => setCurrentDate(new Date(year, month + 1))}
                className="border px-3 py-1 rounded"
              >
                →
              </button>
            </div>

            {/* WEEK */}
            <div className="grid grid-cols-7 text-xs sm:text-sm text-gray-400 mb-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            {/* DAYS */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, i) => {
                const key = formatKey(year, month, day);
                const hasTask = todos.some((t) => t.date === key);

                const isToday =
                  day &&
                  today.getDate() === day &&
                  today.getMonth() === month &&
                  today.getFullYear() === year;

                return (
                  <div
                    key={i}
                    onClick={() =>
                      day && setSelectedDate(new Date(year, month, day))
                    }
                    className={`h-12 sm:h-14 flex items-center justify-center rounded-xl cursor-pointer text-sm sm:text-base transition
                    ${hasTask ? "bg-green-900" : "border border-gray-700"}
                    ${isToday ? "bg-white text-black font-bold" : ""}
                    hover:bg-white hover:text-black`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* TASK CARD */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              {selectedDate.toDateString()}
            </h3>

            {/* INPUT */}
            <div className="flex gap-2 mb-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add task..."
                className="flex-1 px-3 py-2 text-sm bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 border rounded-lg hover:bg-white hover:text-black"
              >
                Add
              </button>
            </div>

            {/* TASK LIST */}
            <div className="space-y-2 max-h-72 overflow-y-auto text-sm">
              {selectedTasks.length === 0 && (
                <p className="text-gray-500 text-sm text-center">No tasks</p>
              )}

              {selectedTasks.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border border-gray-800 rounded-lg px-3 py-2"
                >
                  <span className="truncate">{t.text}</span>
                  <button onClick={() => deleteTask(t.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showAll && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">All Tasks</h2>
              <button onClick={() => setShowAll(false)}>✕</button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 text-sm">
              {todos.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between border border-gray-800 rounded-lg px-3 py-2"
                >
                  <span>{t.text}</span>
                  <button onClick={() => deleteTask(t.id)}>✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
