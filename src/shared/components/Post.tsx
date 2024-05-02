import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { PostContent } from "./PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardFooter } from "./ui/card";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { GetUserProfile } from "@/actions/ProfileAction";

import { useRef, useState } from "react";
import { PostMenu } from "./PostMenu";
import { Icons } from "./Icons";
import { Label } from "@radix-ui/react-label";
import { PatchPost } from "@/actions/PostAction";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type IPostProps = {
  post: IPost;
  fullPage: boolean;
  fullBorder: boolean;
};

const initializer: IProfile = {
  id: "1",
  first_name: "Bianca",
  last_name: "Bezerra",
  username: "biancabzra",
  email: "bianca@gmail.com",
  password: "biazinha",
};

export const Post = ({
  post,
  fullPage = false,
  fullBorder = false,
}: IPostProps) => {
  const { response: perfil, isSuccess } = GetUserProfile(post.user_id);
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { mutate: handlePatch } = PatchPost();

  function handleSaveEdit() {
    if (
      textareaRef.current !== null &&
      textareaRef.current.value !== post.content
    ) {
      handlePatch({ content: textareaRef.current.value, id: post.id });
    }
    setEditMode(!editMode);
    const navigate = useNavigate();

    const onClick = () => {
      // <Navigate to={`/posts/postPage/${post.id}`}/>
      // const queryClient = useQueryClient()
      navigate(`/posts/postPage/${post.id}`, { replace: true });
      // queryClient.invalidateQueries({queryKey: ['post']})
    };

    return (
      <Card
        className={`flex flex-col
    ${fullPage || editMode ? "bg-transparent" : "h-full bg-rebeccapurple"}
    ${
      editMode
        ? "border-t-0 border-l-0 border-r-0 border-b-0 rounded-none"
        : fullBorder
        ? "border-purple-400 "
        : "border-t-0 border-l-0 border-r-0 border-b-purple-400 rounded-none"
    }
    `}
      >
        {isSuccess && editMode ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-2 border-r-0 border-l-0 border-t-0 border-b-0">
            <Textarea
              defaultValue={post.content}
              ref={textareaRef}
              autoFocus={true}
              className="bg-rebeccapurple w-noavatar"
              placeholder="Edit your message here."
              id={`post-${post.id}`}
            ></Textarea>
            <Button onClick={handleSaveEdit} variant="ghost">
              Salvar
            </Button>
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
  }
};

export default Post;
