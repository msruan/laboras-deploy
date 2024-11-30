import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import { LoginLayout } from "./shared/layouts/LoginLayout";
import ErrorPage from "./pages/public/ErrorPage";
import { LoginPage } from "./pages/public/LoginPage";

import PostsPage from "./pages/authenticated/PostsPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import { MainPosts } from "@/shared/components/MainPosts";
import { SettingsPage } from "./pages/public/SettingsPage";
import { SignUpPage } from "./pages/public/SignUpPage";
import LandPage from "./pages/public/LandPage";

const AuthRoutes = [
  {
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
];

const SignRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/posts", element: <MainPosts /> },
      { path: "/", element: <MainPosts /> },
      {
        path: "/posts/:id",
        element: <PostsPage />,
      },
    ],
  },
  {
    path: "/land",
    element: <LandPage />,
  },

  {
    path: "/config",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/config", element: <SettingsPage /> }],
  },

  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/users/:username",
        element: <ProfilePage />,
      },
    ],
  },
];
export const router = createBrowserRouter([...SignRoutes, ...AuthRoutes]);

export default router;
