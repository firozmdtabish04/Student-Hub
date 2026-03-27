import Dashboard from "../pages/Dashboard";
import ClockPage from "../pages/ClockPage";
import StopwatchPage from "../pages/StopwatchPage";
import PomodoroPage from "../pages/PomodoroPage";
import TodoPage from "../pages/TodoPage";
import Calendar from "../pages/CalendarPage";
import Alarm from "../components/Alarm";
import Notes from "../components/Notes";

export const routes = [
  { path: "/", component: Dashboard },
  { path: "/clock", component: ClockPage },
  { path: "/stopwatch", component: StopwatchPage },
  { path: "/pomodoro", component: PomodoroPage },
  { path: "/todo", component: TodoPage },
  { path: "/calendar", component: Calendar },
  { path: "/alarm", component: Alarm },
  {path: "/notes", component :Notes}
];
