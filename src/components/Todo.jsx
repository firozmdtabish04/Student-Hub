import { useState } from "react";

function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task) {
      setList([...list, task]);
      setTask("");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold">Todo</h2>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border p-1 w-full mt-2"
        placeholder="Add task"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
      >
        Add
      </button>

      <ul className="mt-2">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
