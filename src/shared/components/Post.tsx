import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { PostContent } from "./PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";

import {
  TrashIcon,
  FaceSmileIcon,
  FaceFrownIcon,
  HandThumbDownIcon,
  StarIcon,
} from "@heroicons/react/16/solid";

// import {
//   TrashIcon,
//   FaceSmileIcon,
//   FaceFrownIcon,
//   HandThumbDownIcon,
//   StarIcon,
// } from "@heroicons/react/24/outline";

import { GetUserProfile } from "@/actions/HomePageAction";
import { UpdatePost, DeletePost } from "@/actions/PostAction";

import { useState } from "react";

type IPostProps = {
  post: IPost;
  fullpage: boolean;
  fullBorder: boolean;
};

const initializer: IProfile = {
  id: "1",
  name: "Bianca Bezerra",
  username: "biancabzra",
};

export const Post = ({
  post,
  fullpage = false,
  fullBorder = false,
}: IPostProps) => {
  const { response: perfil, isSuccess } = GetUserProfile(post.user_id);
  const { mutate: handleDelete } = DeletePost();
  const { mutate: handleUpdate } = UpdatePost();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);

  function handleLike() {
    if (isLiked) post.likes--;
    else {
      post.likes++;
      if (isDesliked) {
        post.deslikes--;
        setIsDesliked(false);
      }
    }
    setIsLiked(!isLiked);
    handleUpdate(post);
  }

  function handleDeslike() {
    if (isDesliked) post.deslikes--;
    else {
      post.deslikes++;
      if (isLiked) {
        post.likes--;
        setIsLiked(false);
      }
    }
    setIsDesliked(!isDesliked);
    handleUpdate(post);
  }

  return (
    <Card
      className={`w-full flex pt-3 pl-5 pr-3 pb-3 
    ${fullpage ? "bg-transparent" : "h-full bg-rebeccapurple"}
    ${
      fullBorder
        ? "border-purple-400 "
        : "border-t-0 border-l-0 border-r-0 border-b-purple-400 rounded-none"
    }
    `}
    >
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {isSuccess && (
        <PostContent
          perfil={perfil ?? initializer}
          post={post}
          fullPage={fullpage}
        />
      )}

      <div
        className={
          "flex flex-row justify-between pr-7 pb-1 h-fit w-full self-end"
        }
      >
        <div className="flex justify-between items-center text-sm">
          <span>{post.likes > 0 && post.likes}</span>
          <StarIcon
            className={
              `h-4 w-4 ` + (isLiked ? " text-yellow-500" : "text-gray-500")
            }
            onClick={handleLike}
            cursor="pointer"
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span>{post.deslikes > 0 && post.deslikes}</span>
          <FaceFrownIcon
            className={
              `h-4 w-4 ` + (isDesliked ? "text-red-500" : " text-gray-500")
            }
            onClick={handleDeslike}
            cursor="pointer"
          />
        </div>

        <TrashIcon
          className="h-4 w-4 text-gray-500 hover:text-gray-100"
          onClick={() => {
            handleDelete(post.id);
          }}
          cursor="pointer"
        />
      </div>
    </Card>
  );
};

export default Post;
