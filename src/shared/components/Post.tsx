import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { PostContent } from "./PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardFooter } from "./ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { GetUserProfile } from "@/actions/ProfileAction";

import { useState } from "react";
import { PostMenu } from "./PostMenu";
import { Icons } from "./Icons";
import { Link, Navigate, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type IPostProps = {
  post: IPost;
  fullPage: boolean;
  fullBorder: boolean;
};

const initializer: IProfile = {
  id: "1",
  name: "Bianca Bezerra",
  username: "biancabzra",
};

export const Post = ({
  post,
  fullPage = false,
  fullBorder = false,
}: IPostProps) => {
  const { response: perfil, isSuccess } = GetUserProfile(post.user_id);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate()

  const onClick = () => {
    // <Navigate to={`/posts/postPage/${post.id}`}/>
    // const queryClient = useQueryClient()
    navigate(`/posts/postPage/${post.id}`, {replace: true})
    // queryClient.invalidateQueries({queryKey: ['post']})
  }

  return (
    <Card 
      className={`flex flex-col
    ${fullPage ? "bg-transparent" : "h-full bg-rebeccapurple"}
    ${
      fullBorder
        ? "border-purple-400 "
        : "border-t-0 border-l-0 border-r-0 border-b-purple-400 rounded-none"
    }
    `}
    >
      {/* <Link to={window.origin + `/posts/postPage/${post.id}`}> */}
        <div className="w-full flex h-fit pt-3 pl-5 pr-3" onClick={onClick}>
          {/* <h1>{location.pathname}</h1> */}
        {/* <Button onClick={onClick}>entra aq</Button> */}
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {isSuccess && editMode ? (
            <div className="grid w-full gap-2">
              <Textarea placeholder="Type your message here." />
              <Button>Send message</Button>
            </div>
          ) : (
            <PostContent
              perfil={perfil ?? initializer}
              post={post}
              fullPage={fullPage}
            />
          )}
        </div>
        <CardFooter className="flex items-center justify-end h-fit">
          <Icons post={post} fullPage={fullPage}></Icons>
        </CardFooter>
      {/* </Link > */}
    </Card>
  );
};

export default Post;
