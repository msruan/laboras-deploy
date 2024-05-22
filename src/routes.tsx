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
import { useAuth } from "./context/AuthContext";
import { useToken } from "./shared/hooks/useToken";
import { useEmail } from "./shared/hooks/useEmail";

// const { email: token } = useEmail();
// if (token()) {
//   console.log("funfa");
// }
const OtherRoutes = [
  {
    path: "/",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LoginPage /> },
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
      { path: "/", element: <MainPosts /> },
      { path: "/posts/profile/:username", element: <ProfilePage /> },
      {
        path: "/posts/:id",
        element: <PostsPage />,
      },
    ],
  },
  {
    path: "/posts",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/posts", element: <MainPosts /> },
      { path: "/posts/profile/:username", element: <ProfilePage /> },
      {
        path: "/posts/:id",
        element: <PostsPage />,
      },
    ],
  },
  {
    path: "/config",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: "/config", element: <SettingsPage /> }],
  },
];
export const router = createBrowserRouter([...SignRoutes, ...OtherRoutes]);

export default router;
