import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { PostContent } from "./PostContent";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

import { useGetUserProfile } from "@/actions/useGetUserProfile";

import { useEffect, useRef, useState } from "react";

type IPostProps = {
  post: IPost;
  handleDelete: (postId: string) => void;
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
  handleDelete = (postId: string) => {},
  fullpage = false,
  fullBorder = false,
}: IPostProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);

  const { response: perfil, isSuccess } = useGetUserProfile(post.user_id);

  function handleLike() {
    setIsLiked(!isLiked);
  }

  function handleDeslike() {
    setIsDesliked(!isDesliked);
  }

  return (
    <Card
      className={`w-full  flex pt-3 pl-5 pr-3 pb-3 
    ${fullpage ? "bg-transparent" : "h-full bg-rebeccapurple"}
    ${
      fullBorder
        ? "border-purple-400 "
        : "border-t-0 border-l-0 border-r-0 border-b-purple-400 rounded-none"
    }
    `}
    >
      {/* Fotinha */}{" "}
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
        className={`
    ${
      fullpage
        ? "flex flex-row gap-10 pr-7 pb-1 h-fit self-end"
        : "flex flex-col justify-between"
    }
    `}
      >
        {isLiked ? (
          <>
            <FavoriteTwoToneIcon
              onClick={handleLike}
              style={{
                color: "purple",
                fontSize: "1rem",
                border: "solid thin yelllow",
                borderRadius: "2px",
              }}
              cursor="pointer"
            />
          </>
        ) : (
          <>
            <FavoriteBorderOutlinedIcon
              onClick={handleLike}
              cursor="pointer"
              style={{ color: "white", fontSize: "1rem" }}
            />
            {/* <BeakerIcon className="h-6 w-6 text-blue-500" /> */}
          </>
        )}

        {isDesliked ? (
          <ThumbDownAltIcon
            onClick={handleDeslike}
            cursor="pointer"
            style={{ color: "red", fontSize: "1rem" }}
          />
        ) : (
          <ThumbDownOffAltIcon
            onClick={handleDeslike}
            cursor="pointer"
            style={{ color: "white", fontSize: "1rem" }}
          />
        )}

        <DeleteOutlineTwoToneIcon
          onClick={() => {
            handleDelete(post.id);
          }}
          cursor="pointer"
          style={{ cursor: "pointer", fontSize: "1rem" }}
        />
      </div>
    </Card>
  );
};

export default Post;
