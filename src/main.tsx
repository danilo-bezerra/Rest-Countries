import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Routes from "./routes/Routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
