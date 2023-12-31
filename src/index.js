import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routers from "./Components/Routers";
// import express from "express";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>
);

// const app = express();
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
