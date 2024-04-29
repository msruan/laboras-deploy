import { useState } from "react";
import { IPost } from "../models/post";
import { PostMenu } from "./PostMenu";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { PatchPost } from "@/actions/PostAction";

type IconsProps = {
  post: IPost;
  fullPage : boolean;
};

export const Icons = ({ post, fullPage }: IconsProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);
  // const { mutate: handleUpdate } = UpdatePost();
  const { mutate: handleUpdate } = PatchPost();

  function handleLike() {
    if (isLiked) post.likes--;
    else {
      post.likes++;
      if (isDesliked) {
        post.deslikes--;
        setIsDesliked(false);
        handleUpdate({id: post.id, deslikes: post.deslikes});
      }
    }
    setIsLiked(!isLiked);
    handleUpdate({id: post.id, likes: post.likes});
    // handleUpdate(post);
  }

  function handleDeslike() {
    if (isDesliked) post.deslikes--;
    else {
      post.deslikes++;
      if (isLiked) {
        post.likes--;
        setIsLiked(false);
        handleUpdate({id: post.id, likes: post.likes});
      }
    }
    setIsDesliked(!isDesliked);
    handleUpdate({id: post.id, deslikes: post.deslikes});
    // handleUpdate(post);
  }
  return (
    <div
      className={`flex flex-row justify-between pr-7 pb-1 h-fit
      ${fullPage ? " w-1/4" : " w-1/4"}
      `}
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
      <PostMenu post={post}></PostMenu>

      {/* <TrashIcon
          className="h-4 w-4 text-gray-500 hover:text-gray-100"
          cursor="pointer"
          onClick={() => {
            handleDelete(post.id);
          }}
        /> */}
    </div>
  );
};
