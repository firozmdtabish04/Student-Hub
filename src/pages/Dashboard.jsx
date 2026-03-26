import { useLocation, useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import AnimatedBackground from "../components/AnimatedBackground";
import Spotlight from "../components/Spotlight";
import { useState, useEffect } from "react";

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
} from "@fortawesome/free-solid-svg-icons";

function Dashboard({ dark, setDark }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // ✅ Spotlight state
  const [openSpotlight, setOpenSpotlight] = useState(false);

  // 🔥 Ctrl + K open
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

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const menu = [
    { name: "Dashboard", icon: faHouse, path: "/" },
    { name: "Planner", icon: faCalendar, path: "/calendar" },
    { name: "Focus", icon: faClock, path: "/pomodoro" },
    { name: "Analytics", icon: faChartBar, path: "/analytics" },
    { name: "Settings", icon: faGear, path: "/settings" },
  ];

  const tools = [
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
    { title: "Todo", desc: "Manage tasks", icon: faListCheck, route: "/todo" },
    {
      title: "Calendar",
      desc: "Plan schedule",
      icon: faCalendar,
      route: "/calendar",
    },
    { title: "Alarm", desc: "Smart reminders", icon: faBell, route: "/alarm" },
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
  ];

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      tool.desc.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black dark:bg-black dark:text-white">
      {/* ✅ WORKING Spotlight */}
      <Spotlight
        tools={tools}
        open={openSpotlight}
        setOpen={setOpenSpotlight}
      />

      <AnimatedBackground />

      <div className="flex min-h-screen bg-white/70 dark:bg-black/50 backdrop-blur-xl">
        {/* Sidebar */}
        <div className="w-64 bg-white/70 dark:bg-black/40 border-r border-black/10 dark:border-white/10 p-6 hidden md:block">
          <h2 className="text-xl font-semibold mb-10">🚀 Student Hub</h2>

          <ul className="space-y-2">
            {menu.map((item) => (
              <li
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                ${
                  location.pathname === item.path
                    ? "bg-blue-500/20 text-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Main */}
        <div className="flex-1 p-6">
          {/* Topbar */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-semibold">Productivity Dashboard</h1>

            <div className="flex items-center gap-4">
              {/* 🔥 CLICK TO OPEN SPOTLIGHT */}
              <input
                onClick={() => setOpenSpotlight(true)}
                placeholder="Search tools... (Ctrl + K)"
                className="bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 px-4 py-2 rounded-lg text-sm cursor-pointer"
              />

              <button
                onClick={() => setDark(!dark)}
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
              >
                {dark ? "🌞 Light" : "🌙 Dark"}
              </button>

              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredTools.map((tool, i) => (
              <DashboardCard key={i} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
