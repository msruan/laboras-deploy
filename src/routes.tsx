import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import { LoginLayout } from "./shared/layouts/LoginLayout";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import { LoginPage } from "./pages/public/LoginPage";
import { SignUpPage } from "./pages/public/SignUpPage";
import PostsPage from "./pages/authenticated/PostsPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import { MainPosts } from "@/shared/components/MainPosts";
import { AsideMyProfile } from "@/shared/components/AsideMyProfile";
import { TextBox } from "@/shared/components/TextBox";
import { IPost } from "@/shared/models/post";
import Post from "@/shared/components/Post";

const myPost = {
  id: "01HWMSPP23DW9CF0CRDADKZZ7F",
  user_id: "1",
  content:
    "Você também pode personalizar os ícones, se necessário, usando propriedades específicas. Por exemplo, você pode definir o tamanho do ícone ou a cor usando as propriedades size e color, respectivamente.\n\njsx\n",
  created_at: "2024-04-29T11:26:37.635Z",
  likes: 3,
  deslikes: 0,
  linked_to: null,
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
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
