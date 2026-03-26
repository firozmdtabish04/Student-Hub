import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";
import { useState, useEffect } from "react";

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Routes>
      {routes.map((route, index) => {
        const Component = route.component; // ✅ better naming

        return (
          <Route
            key={index}
            path={route.path}
            element={<Component dark={dark} setDark={setDark} />}
          />
        );
      })}
    </Routes>
  );
}

export default App;
