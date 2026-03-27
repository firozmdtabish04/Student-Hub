import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Notes() {
  const navigate = useNavigate();

  const loadNotes = () => {
    try {
      return JSON.parse(localStorage.getItem("notes")) || [];
    } catch {
      return [];
    }
  };

  const [notes, setNotes] = useState(loadNotes);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // SAVE
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // ADD / UPDATE
  const handleSave = () => {
    if (!text.trim()) return;

    if (editingId) {
      setNotes((prev) =>
        prev.map((n) => (n.id === editingId ? { ...n, text } : n)),
      );
      setEditingId(null);
    } else {
      setNotes((prev) => [{ id: Date.now(), text, pinned: false }, ...prev]);
    }

    setText("");
  };

  // DELETE
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // EDIT
  const editNote = (note) => {
    setText(note.text);
    setEditingId(note.id);
  };

  // 📌 PIN
  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  // 🔍 FILTER + SORT
  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => n.text.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.pinned - a.pinned);
  }, [notes, search]);

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="border px-3 py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          ← Back
        </button>

        <h1 className="text-sm sm:text-lg md:text-xl font-semibold">
          NOTES ({notes.length})
        </h1>

        <div className="w-[70px]" />
      </div>

      {/* MAIN */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10">
          {/* SEARCH */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full mb-4 px-4 py-2 bg-black border border-gray-700 rounded-lg"
          />

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a note..."
              className="flex-1 px-4 py-2 bg-black border border-gray-700 rounded-lg"
            />

            <button
              onClick={handleSave}
              className="px-4 py-2 border rounded-lg hover:bg-white hover:text-black transition"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>

          <div className="border-t border-gray-800 mb-6" />

          {/* NOTES LIST */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredNotes.length === 0 && (
              <p className="text-gray-500 text-center">No notes found</p>
            )}

            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`flex justify-between items-center border rounded-xl px-4 py-3 transition
                ${note.pinned ? "border-yellow-500 bg-yellow-500/10" : "border-gray-800 hover:bg-white/5"}`}
              >
                <span className="flex-1">{note.text}</span>

                <div className="flex gap-3 ml-3 text-xs sm:text-sm">
                  <button onClick={() => togglePin(note.id)}>📌</button>

                  <button
                    onClick={() => editNote(note)}
                    className="hover:text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="hover:text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-6 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
            Notes • Auto Saved
          </div>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-white/5" />
      </div>
    </div>
  );
}

export default Notes;
