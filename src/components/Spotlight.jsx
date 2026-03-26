import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Spotlight({ tools, open, setOpen }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const ref = useRef();
  const itemRefs = useRef([]); // ✅ FIXED (correct place)

  const navigate = useNavigate();

  const filtered = tools.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.desc.toLowerCase().includes(query.toLowerCase()),
  );

  // ✅ Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, setOpen]);

  // ✅ Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        setActiveIndex((prev) =>
          filtered.length ? (prev + 1) % filtered.length : 0,
        );
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) =>
          filtered.length ? (prev === 0 ? filtered.length - 1 : prev - 1) : 0,
        );
      } else if (e.key === "Enter") {
        if (filtered[activeIndex]) {
          navigate(filtered[activeIndex].route);
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, activeIndex, navigate, setOpen]);

  // ✅ Auto scroll active item into view
  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // ✅ Reset refs when list changes
  useEffect(() => {
    itemRefs.current = [];
    setActiveIndex(0);
  }, [filtered]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl flex justify-center items-start pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={ref}
            className="w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
          >
            {/* 🔍 Search */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Search tools... (↑ ↓ Enter)"
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {/* 📜 Results */}
            <div className="max-h-60 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-6">
                  No results found
                </p>
              )}

              {filtered.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  onClick={() => {
                    navigate(item.route);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    i === activeIndex
                      ? "bg-blue-500 text-white shadow-lg scale-[1.02]"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.01]"
                  }`}
                >
                  {/* 🔥 Icon */}
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-lg ${
                      i === activeIndex
                        ? "text-white"
                        : "text-blue-500 dark:text-blue-400"
                    }`}
                  />

                  {/* 📝 Text */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs opacity-70">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ⚡ Footer */}
            <div className="px-4 py-2 text-xs text-gray-400 border-t border-gray-200 dark:border-white/10 flex justify-between">
              <span>↑ ↓ navigate</span>
              <span>Enter select • Esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Spotlight;
