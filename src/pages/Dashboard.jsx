import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import DashboardCard from "../components/DashboardCard";
import AnimatedBackground from "../components/AnimatedBackground";
import Spotlight from "../components/Spotlight";

// Font Awesome
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
} from "@fortawesome/free-solid-svg-icons";

function Dashboard({ dark, setDark }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openSpotlight, setOpenSpotlight] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recent, setRecent] = useState([]);

  // 🔥 Fuzzy Search
  const fuzzyMatch = (text, query) => {
    text = text.toLowerCase();
    query = query.toLowerCase();

    let t = 0,
      q = 0;
    while (t < text.length && q < query.length) {
      if (text[t] === query[q]) q++;
      t++;
    }
    return q === query.length;
  };

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

  // load recent
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentTools")) || [];
    setRecent(saved);
  }, []);

  // save recent
  const saveRecent = (tool) => {
    const updated = [
      tool,
      ...recent.filter((t) => t.title !== tool.title),
    ].slice(0, 5);
    setRecent(updated);
    localStorage.setItem("recentTools", JSON.stringify(updated));
  };

  // menu
  const menu = useMemo(
    () => [
      { name: "Dashboard", icon: faHouse, path: "/" },
      { name: "Planner", icon: faCalendar, path: "/calendar" },
      { name: "Focus", icon: faClock, path: "/pomodoro" },
      { name: "Analytics", icon: faChartBar, path: "/analytics" },
      { name: "Settings", icon: faGear, path: "/settings" },
    ],
    [],
  );

  // tools
  const tools = useMemo(
    () => [
      {
        title: "Clock",
        desc: "Live time display",
        icon: faClock,
        route: "/clock",
      },
      {
        title: "Stopwatch",
        desc: "Track time precisely",
        icon: faStopwatch,
        route: "/stopwatch",
      },
      {
        title: "Pomodoro",
        desc: "Focus sessions",
        icon: faClock,
        route: "/pomodoro",
      },
      {
        title: "Todo",
        desc: "Manage tasks",
        icon: faListCheck,
        route: "/todo",
      },
      {
        title: "Calendar",
        desc: "Plan schedule",
        icon: faCalendar,
        route: "/calendar",
      },
      {
        title: "Alarm",
        desc: "Smart reminders",
        icon: faBell,
        route: "/alarm",
      },
      {
        title: "Notes",
        desc: "Quick notes",
        icon: faNoteSticky,
        route: "/notes",
      },
      {
        title: "Analytics",
        desc: "Productivity stats",
        icon: faChartBar,
        route: "/analytics",
      },
      {
        title: "Focus Mode",
        desc: "Deep work mode",
        icon: faBullseye,
        route: "/focus",
      },
    ],
    [],
  );

  // 🔥 Smart filter
  const filteredTools = useMemo(() => {
    if (!debouncedSearch) return tools;

    return tools
      .map((tool) => {
        const score = fuzzyMatch(tool.title, debouncedSearch)
          ? 2
          : fuzzyMatch(tool.desc, debouncedSearch)
            ? 1
            : 0;

        return { ...tool, score };
      })
      .filter((t) => t.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [debouncedSearch, tools]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <Spotlight
        tools={tools}
        open={openSpotlight}
        setOpen={setOpenSpotlight}
      />
      <AnimatedBackground />

      <div className="flex min-h-screen bg-white/60 dark:bg-black/40 backdrop-blur-2xl">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed md:static z-50 w-64 h-full bg-white/80 dark:bg-black/50 backdrop-blur-xl p-6 transition
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-10">
            <FontAwesomeIcon icon={faRocket} className="text-blue-500" />
            Student Hub
          </h2>

          <ul className="space-y-2">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <li
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                    isActive
                      ? "bg-blue-500/20 text-blue-500 border-l-4 border-blue-500"
                      : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Main */}
        <motion.div
          className="flex-1 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Topbar */}
          <div className="flex justify-between items-center mb-10">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden">
              <FontAwesomeIcon icon={faBars} />
            </button>

            <h1 className="text-2xl md:text-3xl font-semibold">
              Productivity Dashboard
            </h1>

            <div className="flex items-center gap-4">
              {/* Spotlight */}
              <div
                onClick={() => setOpenSpotlight(true)}
                className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition"
              >
                {/* 🔍 Icon */}
                <FontAwesomeIcon icon={faSearch} className="text-gray-500" />

                {/* Text */}
                <span className="text-gray-500">Search</span>

                {/* Shortcut */}
                <span className="ml-auto text-xs opacity-60">Ctrl + K</span>
              </div>

              {/* Theme */}
              <button
                onClick={() => setDark(!dark)}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white transition"
              >
                <FontAwesomeIcon icon={dark ? faSun : faMoon} />
                <span className="text-sm">{dark ? "Light" : "Dark"}</span>
              </button>
            </div>
          </div>

          {/* 🔥 Recent */}
          {debouncedSearch === "" && recent.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm text-gray-400 mb-2">Recent</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {recent.map((tool, i) => (
                  <DashboardCard key={i} {...tool} />
                ))}
              </div>
            </div>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTools.length === 0 ? (
              <p className="col-span-3 text-center text-gray-400">
                No tools found
              </p>
            ) : (
              filteredTools.map((tool, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}>
                  <div onClick={() => saveRecent(tool)}>
                    <DashboardCard {...tool} />
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
