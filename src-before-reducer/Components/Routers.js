import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Navigation from "./Navigation";
import Button from "./Button";
// import { PostProvider } from "./PostContext";
import { PostProvider } from "./PostContext-with-reducer";
import { AuthProvider } from "./AuthContext";
import HomePage from "../HomePage";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../PageNotFound";
import CreateUser from "./CreateUser";

function Main() {
  const [isDark, setIsDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("dark-mode");
    },
    [isDark]
  );
  return (
    <AuthProvider>
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
          <Route index element={<HomePage />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <PostProvider>
                  <App />
                </PostProvider>
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Main;
