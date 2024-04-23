import React from "react";
import ReactDOM from "react-dom/client";
// import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App idLoggedUser={"2"} /> */}
    {/* <Login/> */}
    <RouterProvider router={router}/>
  </React.StrictMode>
);
