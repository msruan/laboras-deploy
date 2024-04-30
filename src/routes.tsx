import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import { LoginLayout } from "./shared/layouts/LoginLayout";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import {LoginPage} from "./pages/public/LoginPage";

import PostsPage from "./pages/authenticated/PostsPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import { MainPosts } from "@/shared/components/MainPosts";
import { AsideMyProfile } from "@/shared/components/AsideMyProfile";
import { TextBox } from "@/shared/components/TextBox";
import { SignUpPage } from "./pages/public/SignUpPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "/posts",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/posts", element: <MainPosts idLoggedUser={"1"} /> },
      { path: "/posts/profile", element: <ProfilePage /> },
      { path: "/posts/postPage/:id", element: <PostsPage idLoggedUser={"1"} /> },
    ],
  },
  {
    path: "/teste",
    element: <TextBox idLoggedUser={""} linkedTo={null} />,
  },
  { path: "/teste2", element: <MainPosts idLoggedUser={"1"} /> },
]);

export default router;
