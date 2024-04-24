import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
// import Login from "./pages/public/LoginPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App idLoggedUser={"2"} /> */}
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <RouterProvider router={router}/> 
     </ThemeProvider>
  </React.StrictMode>
);
