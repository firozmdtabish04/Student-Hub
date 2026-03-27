import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todo() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("todos")) || [],
  );

  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);

  const addTask = () => {
    if (!task.trim()) return;
    setList((prev) => [
      ...prev,
      { id: Date.now(), text: task, completed: false },
    ]);
    setTask("");
  };

  const deleteTask = (id) => {
    setList((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditText(item.text);
  };

  const saveEdit = () => {
    setList((prev) =>
      prev.map((t) => (t.id === editId ? { ...t, text: editText } : t)),
    );
    setEditId(null);
  };

  const clearCompleted = () => {
    setList((prev) => prev.filter((t) => !t.completed));
  };

  const filteredList = list.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = list.filter((t) => t.completed).length;

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="text-xs sm:text-sm border px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>

        <h1 className="text-sm sm:text-lg font-semibold">TODO</h1>

        <div className="text-[10px] sm:text-xs text-gray-400">
          {completedCount}/{list.length}
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex justify-center px-3 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-md sm:max-w-lg border border-gray-800 rounded-2xl p-4 sm:p-6">
          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add task..."
              className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded focus:outline-none focus:border-white"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 border rounded hover:bg-white hover:text-black transition"
            >
              Add
            </button>
          </div>

          {/* FILTER */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-4 text-sm">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {["all", "active", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded text-xs sm:text-sm ${
                    filter === f
                      ? "bg-white text-black"
                      : "border border-gray-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <button
              onClick={clearCompleted}
              className="text-xs text-gray-400 hover:text-red-400 text-center sm:text-right"
            >
              Clear Completed
            </button>
          </div>

          {/* LIST */}
          <div className="space-y-2 max-h-80 sm:max-h-96 overflow-y-auto">
            {filteredList.length === 0 && (
              <p className="text-gray-500 text-center text-sm">No tasks</p>
            )}

            {filteredList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border border-gray-800 rounded px-3 py-2"
              >
                {editId === item.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") setEditId(null);
                    }}
                    className="flex-1 bg-black border border-gray-700 px-2 py-1 rounded text-sm"
                  />
                ) : (
                  <span
                    onClick={() => toggleTask(item.id)}
                    onDoubleClick={() => startEdit(item)}
                    className={`flex-1 cursor-pointer text-sm ${
                      item.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {item.text}
                  </span>
                )}

                <div className="flex gap-2 ml-2 text-xs sm:text-sm">
                  <button
                    onClick={() => startEdit(item)}
                    className="hover:text-blue-400"
                  >
                    ✎
                  </button>

                  <button
                    onClick={() => deleteTask(item.id)}
                    className="hover:text-red-400"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
