import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { IPost } from "../../models/post";
import { Card, CardFooter } from "../ui/card";
import { PostContent } from "./PostContent";

import { UpdatePost } from "@/actions/PostAction";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "./Icons";
import { PostMenu } from "./PostMenu";
import { ProfileBase } from "@/shared/models/profile";

type Props = {
  owner?: ProfileBase;
  post: IPost;
  fullPage: boolean;
  fullBorder: boolean;
};

export const Post = ({ fullBorder = false, ...props }: Props) => {
  const post = props.post;
  const perfil = props.owner ?? props.post.owner;
  const fullPage = props.fullPage;

  const { mutate: handlePatch } = UpdatePost();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const local = useLocation();
  const [editMode, setEditMode] = useState(false);

  function handleSaveEdit() {
    if (
      textareaRef.current !== null &&
      textareaRef.current.value !== post.content
    ) {
      handlePatch({ content: textareaRef.current.value, uid: post.uid });
    }
    setEditMode(!editMode);
  }
  
  const navigate = useNavigate();

  const onClick = () => {
    const link = `/posts/${post.uid}`;
    if (local.pathname != link) {
      navigate(link);
    }
  };

  return (
    <>
      <Card
        className={`flex flex-col
          ${fullPage ? "" : "cursor-pointer"}
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
        {editMode ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-2 border-t-0 border-b-0 border-l-0 border-r-0">
            <Textarea
              defaultValue={post.content}
              ref={textareaRef}
              autoFocus={true}
              className="bg-rebeccapurple w-noavatar"
              placeholder="Edit your message here."
              id={`post-${post.uid}`}
            ></Textarea>
            <Button onClick={handleSaveEdit} variant="ghost">
              Salvar
            </Button>
          </div>
        ) : (
          <>
            <div className="flex w-full pt-3 pl-5 pr-3 h-fit">
              <Link to={`/users/${perfil.username}`}>
                <Avatar>
                  <AvatarImage
                    className="w-12 h-12 rounded-full"
                    src={perfil.avatar_link === "" ? "src/assets/chorro-timido.JPG" : perfil.avatar_link }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>

              <PostContent
                onClick={onClick}
                perfil={perfil}
                post={post}
                fullPage={fullPage}
                handleEdit={setEditMode}
              />
            </div>
            {!fullPage && (
              <CardFooter className="flex items-center justify-end h-fit">
                <div
                  className={`flex flex-row justify-between pr-7 pb-1 h-fit
      ${fullPage ? " w-1/4 max-md:w-full" : " w-1/4 max-md:w-full"}
      `}
                >
                  <Icons post={post}></Icons>
                  <PostMenu handleEdit={setEditMode} post={post} />
                </div>
              </CardFooter>
            )}
          </>
        )}
      </Card>
    </>
  );
};

export default Post;
