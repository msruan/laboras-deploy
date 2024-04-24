import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import LoginLayout from "./shared/layouts/LoginLayout";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import PostsPage from "./pages/authenticated/PostsPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import { MainPosts } from "@/components/MainPosts";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout/>,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> }
    ]
  },
  {
    path: "/posts",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
        { path: "/posts", element: <PostsPage /> },
        { path: "/posts/profile", element: <ProfilePage/>}
    ],
  },
  {
    path: "/teste",
    element: <MainPosts idLoggedUser={"1"}/>
  }
]);

export default router