import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./shared/layouts/MainLayout";
import {LoginLayout} from "./shared/layouts/LoginLayout";
import ErrorPage from "./pages/public/ErrorPage";
import HomePage from "./pages/public/HomePage";
import {LoginPage} from "./pages/public/LoginPage";
import {SignUpPage} from "./pages/public/SignUpPage";
import PostsPage from "./pages/authenticated/PostsPage";
import ProfilePage from "./pages/authenticated/ProfilePage";
import { MainPosts } from "@/components/MainPosts";
import { AsideMyProfile } from "@/components/AsideMyProfile";
import { TextBox } from "@/components/TextBox";
import { IPost } from "@/models/post";
import { App } from "./App";
import Post from "@/components/Post";
import useToken from "@/hooks/useToken";

const {setToken} = useToken()

export const router = createBrowserRouter([
{
    path: "/",
    element: <LoginLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element:  <LoginPage setToken={setToken}/>},
      { path: "/signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "/posts",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/posts", element: <MainPosts idLoggedUser={"1"}/> },
      { path: "/posts/profile", element: <ProfilePage /> },
      { path: "/posts/postPage", element: <PostsPage/>},
    ],
  },
  {
    path: "/teste",
    element: (
      <TextBox
        idLoggedUser={""}
        addNewPost={function (newPost: IPost): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
  },
  { path: "/teste2", element: <MainPosts idLoggedUser={"1"} /> },
]);

export default router;
