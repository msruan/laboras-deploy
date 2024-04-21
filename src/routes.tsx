import { createBrowserRouter } from "react-router-dom";

import { PostPage } from "./pages/AuthenticatedPages/PostPage";
import { ErrorPage } from "./pages/PublicPages/ErrorPage";
import { HomePage } from "./pages/PublicPages/HomePage";
import { LoginPage } from "./pages/PublicPages/LoginPage";
import { MainLayout } from "./shared/layouts/MainLayout";
import { ProtectedLayout } from "./shared/layouts/ProtectedLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    path: "/posts",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/posts", element: <PostPage /> }],
  },
]);
