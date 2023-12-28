import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import LogIn from "./LogIn";
import Navigation from "./Navigation";
import Button from "./Button";
function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDark, setIsDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("dark-mode");
    },
    [isDark]
  );
  return (
    <BrowserRouter>
      <header>
        <Navigation />
        <Button
          onClick={() => setIsDark((isDark) => !isDark)}
          className="btn-dark-mode"
        >
          {" "}
          {isDark ? "☀️" : "🌙"}
        </Button>
      </header>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
