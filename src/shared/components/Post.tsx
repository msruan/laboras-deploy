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
  email: "bianca@gmail.com",
  password: "biazinha"
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
      {isSuccess && editMode ? (
        <div className="grid w-full h-full gap-2">
          <Textarea
            className="bg-transparent"
            placeholder="Type your message here."
          />
          <div className="w-1/2 first-letter:flex items-center justify-center">
            <Button>Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full flex h-fit pt-3 pl-5 pr-3" onClick={onClick}>
            <Avatar className="w-12 h-12 rounded-full">
              <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <PostContent
              perfil={perfil ?? initializer}
              post={post}
              fullPage={fullPage}
              handleEdit={setEditMode}
            />
          </div>
          {!fullPage && (
            <CardFooter className="flex items-center justify-end h-fit">
              <div
                className={`flex flex-row justify-between pr-7 pb-1 h-fit
      ${fullPage ? " w-1/4" : " w-1/4"}
      `}
              >
                <Icons post={post} fullPage={fullPage}></Icons>
                <PostMenu handleEdit={setEditMode} post={post} />
              </div>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};

export default Post;
