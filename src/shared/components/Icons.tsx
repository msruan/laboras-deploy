import { useState } from "react";
import { IPost } from "../models/post";
import { PostMenu } from "./PostMenu";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { UpdatePost } from "@/actions/PostAction";
import { PostRequest } from "../models/post";

type IconsProps = {
  post: IPost;
  fullPage: boolean;
};

export const Icons = ({ post, fullPage }: IconsProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);
  const { mutate: handleUpdate } = UpdatePost();

  function handleLike() {
    if (isLiked) post.likes--;
    else {
      post.likes++;
      if (isDesliked) {
        post.deslikes--;
        setIsDesliked(false);
        handleUpdate({
          id: post.id,
          likes: post.likes,
          deslikes: post.deslikes,
        });
      }
    }
    setIsLiked(!isLiked);
    handleUpdate({ id: post.id, likes: post.likes });
  }

  function handleDeslike() {
    if (isDesliked) post.deslikes--;
    else {
      post.deslikes++;
      if (isLiked) {
        post.likes--;
        setIsLiked(false);
        handleUpdate({
          id: post.id,
          likes: post.likes,
          deslikes: post.deslikes,
        });
      }
    }
    setIsDesliked(!isDesliked);
    handleUpdate({ id: post.id, deslikes: post.deslikes });
  }
  return (
    <>
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
    </>
  );
};
