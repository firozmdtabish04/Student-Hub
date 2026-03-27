import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true); // ✅ new state

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Loader delay (Splash Screen)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // ⏳ 1.5 sec (change if needed)

    return () => clearTimeout(timer);
  }, []);

  // 👇 Show loader first
  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;

        return (
          <Route
            key={route.path}
            path={route.path}
            element={<Component dark={dark} setDark={setDark} />}
          />
        );
      })}
    </Routes>
  );
}

export default App;
