// src/routes/routes.js

import Dashboard from "../pages/Dashboard";
import ClockPage from "../pages/ClockPage";
import StopwatchPage from "../pages/StopwatchPage";
import PomodoroPage from "../pages/PomodoroPage";
import TodoPage from "../pages/TodoPage";
import Calendar from "../pages/CalendarPage";
import Alarm from "../components/Alarm";
import Notes from "../components/Notes";
import Calculator from "../components/Calculator";
import FocusMode from "../components/FocusMode";

export const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/clock", name: "Clock", component: ClockPage },
  { path: "/stopwatch", name: "Stopwatch", component: StopwatchPage },
  { path: "/pomodoro", name: "Pomodoro", component: PomodoroPage },
  { path: "/todo", name: "Todo", component: TodoPage },
  { path: "/calendar", name: "Calendar", component: Calendar },
  { path: "/alarm", name: "Alarm", component: Alarm },
  { path: "/notes", name: "Notes", component: Notes },
  { path: "/calculator", name: "Calculator", component: Calculator }, // fixed
  { path: "/focus", name: "Focus Mode", component: FocusMode },
];
