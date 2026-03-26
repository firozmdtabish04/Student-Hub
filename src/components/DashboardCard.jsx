import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardCard({ title, desc, details, icon, route }) {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef();

  // ✅ Close flip on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setFlipped(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={cardRef}
      className="group perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-56 transition-transform duration-500 transform-style preserve-3d
        ${flipped ? "rotate-y-180" : "group-hover:rotate-y-180"}`}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-2xl p-6 border backface-hidden
        bg-gradient-to-br from-white to-gray-100 text-black border-gray-200
        shadow-md hover:shadow-2xl hover:shadow-blue-500/30
        dark:from-gray-900 dark:to-gray-800 dark:text-white dark:border-white/10"
        >
          <div className="text-4xl mb-4 text-blue-500">
            <FontAwesomeIcon icon={icon} />
          </div>

          <h2 className="text-lg font-semibold">{title}</h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            {desc}
          </p>

          <div className="mt-4 h-[3px] w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl p-6 border backface-hidden rotate-y-180
        bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white
        shadow-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            <p className="text-sm leading-relaxed opacity-90">{details}</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(route);
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Open →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
