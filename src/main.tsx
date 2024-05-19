import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import { ThemeProvider } from "@/shared/components/ui/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoggedUserProvider } from "./context/AuthContext.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <LoggedUserProvider>
          <RouterProvider router={router} />
        </LoggedUserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
