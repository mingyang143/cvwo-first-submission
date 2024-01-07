import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PostProvider } from "./PostContext";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

import Navigation from "./Navigation";
import Button from "./Button";
import SpinnerFull from "./SpinnerFull";

const HomePage = lazy(() => import("../HomePage"));
const App = lazy(() => import("./App"));
const Login = lazy(() => import("./Login"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const CreateUser = lazy(() => import("./CreateUser"));

function Main() {
  const [isDark, setIsDark] = useState(false);
  useEffect(
    function () {
      document.documentElement.classList.toggle("dark-mode");
    },
    [isDark]
  );
  return (
    <BrowserRouter>
      <AuthProvider>
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
        <Suspense fallback={<SpinnerFull />}>
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
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Main;
