import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { PostContent } from "./PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardFooter } from "./ui/card";

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

import { GetUserProfile } from "@/actions/ProfileAction";
import { UpdatePost, DeletePost } from "@/actions/PostAction";

import { useState } from "react";
import { PostMenu } from "./PostMenu";
import { Icons } from "./Icons";

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
  const { mutate: handleDelete } = DeletePost();
  const { mutate: handleUpdate } = UpdatePost();

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
      <div className="w-full flex h-fit pt-3 pl-5 pr-3">
        <Avatar className="w-12 h-12 rounded-full">
          <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {isSuccess && (
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
    </Card>
  );
};

export default Post;
