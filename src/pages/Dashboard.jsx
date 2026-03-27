import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import DashboardCard from "../components/DashboardCard";
import AnimatedBackground from "../components/AnimatedBackground";
import Spotlight from "../components/Spotlight";

import { routes } from "../routes/routes"; // ✅ added

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendar,
  faClock,
  faChartBar,
  faGear,
  faStopwatch,
  faListCheck,
  faBell,
  faNoteSticky,
  faBullseye,
  faBars,
  faSearch,
  faRocket,
  faSun,
  faMoon,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

function Dashboard({ dark, setDark }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openSpotlight, setOpenSpotlight] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 Ctrl + K
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSpotlight(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);


  // ✅ NEW MENU FROM ROUTES (NO LOGIC CHANGE ELSEWHERE)
  const menu = useMemo(() => {
    return routes.map((r) => ({
      name: r.name,
      path: r.path,
    }));
  }, []);
const routeIcons = {
  "/": faHouse,
  "/clock": faClock,
  "/stopwatch": faStopwatch,
  "/pomodoro": faClock,
  "/todo": faListCheck,
  "/calendar": faCalendar,
  "/alarm": faBell,
  "/notes": faNoteSticky,
  "/calculator": faCalculator,
  "/focus": faBullseye,
};
  // tools (UNCHANGED)
  const tools = useMemo(
    () => [
      {
        title: "Clock",
        desc: "Live time display",
        details: "View real-time clock with precise time updates.",
        icon: faClock,
        route: "/clock",
      },
      {
        title: "Stopwatch",
        desc: "Track time precisely",
        details: "Measure time intervals with lap tracking.",
        icon: faStopwatch,
        route: "/stopwatch",
      },
      {
        title: "Pomodoro",
        desc: "Focus sessions",
        details: "Boost productivity with Pomodoro sessions.",
        icon: faClock,
        route: "/pomodoro",
      },
      {
        title: "Todo",
        desc: "Manage tasks",
        details: "Organize tasks and improve workflow.",
        icon: faListCheck,
        route: "/todo",
      },
      {
        title: "Calendar",
        desc: "Plan schedule",
        details: "Manage events and schedules easily.",
        icon: faCalendar,
        route: "/calendar",
      },
      {
        title: "Alarm",
        desc: "Smart reminders",
        details: "Never miss important tasks with alarms.",
        icon: faBell,
        route: "/alarm",
      },
      {
        title: "Notes",
        desc: "Quick notes",
        details: "Write and store quick notes instantly.",
        icon: faNoteSticky,
        route: "/notes",
      },
      {
        title: "Calculator",
        desc: "Quick calculations",
        details: "Perform fast calculations with a clean UI.",
        icon: faCalculator,
        route: "/calculator",
      },
      {
        title: "Focus Mode",
        desc: "Deep work",
        details: "Eliminate distractions and focus deeply.",
        icon: faBullseye,
        route: "/focus",
      },
    ],
    [],
  );

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <Spotlight
        tools={tools}
        open={openSpotlight}
        setOpen={setOpenSpotlight}
      />
      <AnimatedBackground />

      <div className="flex min-h-screen bg-white/60 dark:bg-black/40 backdrop-blur-2xl">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:static z-50 w-64 h-full bg-white/90 dark:bg-black/80 backdrop-blur-xl p-6
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
              Learning Center
            </h2>

            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          </div>

          {/* ✅ ROUTES BASED MENU */}
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
                  isActive
                    ? "bg-blue-500/20 text-blue-500"
                    : "text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10"
                }`}
              >
                <FontAwesomeIcon
                  icon={routeIcons[item.path]}
                  className="text-sm"
                />
                {item.name}
              </div>
            );
          })}
        </div>

        {/* MAIN (UNCHANGED) */}
        <motion.div
          className="flex-1 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Topbar */}
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-xl"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <h1 className="text-xl md:text-3xl font-semibold flex-1 text-center md:text-left">
              Task & Time Manager
            </h1>

            <div className="flex items-center gap-3">
              <div
                onClick={() => setOpenSpotlight(true)}
                className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-6 py-3 rounded-lg cursor-pointer"
              >
                <FontAwesomeIcon icon={faSearch} />
                Search ... (Ctrl + k)
              </div>

              <button
                onClick={() => setDark(!dark)}
                className="flex items-center gap-2 bg-blue-500 px-6 py-3 rounded-lg text-white"
              >
                <FontAwesomeIcon icon={dark ? faSun : faMoon} />
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}>
                <DashboardCard {...tool} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
