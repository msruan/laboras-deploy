import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Login } from "./Login.tsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App idLoggedUser={"2"} /> */}
    <Login />
  </React.StrictMode>
);
