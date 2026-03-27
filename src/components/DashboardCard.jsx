import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardCard({ title, desc, details, icon, route }) {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef();

  // CLOSE ON OUTSIDE CLICK
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
      className="group perspective cursor-pointer w-full"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-60 sm:h-64 transition-transform duration-700 [transform-style:preserve-3d]
        ${flipped ? "rotate-y-180" : "group-hover:rotate-y-180"}`}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-3xl p-6 border [backface-visibility:hidden]
          bg-white/90 dark:bg-white/5 backdrop-blur-xl
          border-gray-200 dark:border-white/10
          shadow-lg hover:shadow-2xl hover:scale-[1.02]
          transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="text-4xl sm:text-5xl mb-4 text-blue-500">
              <FontAwesomeIcon icon={icon} />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              {desc}
            </p>
          </div>

          <div className="mt-4 h-[3px] w-14 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"></div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-3xl p-6 border rotate-y-180 [backface-visibility:hidden]
          bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 text-white
          shadow-2xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>

            <p className="text-sm sm:text-base leading-relaxed opacity-90">
              {details}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(route);
            }}
            className="bg-white text-blue-600 px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition"
          >
            Open →
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
