import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Authentication from "./Authentication";
import Navigation from "./Navigation";
function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
