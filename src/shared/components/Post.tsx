import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { PostContent } from "./PostContent";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardTitle } from "./ui/card";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";

import { useEffect, useRef, useState } from "react";

type IPostProps = {
  post: IPost;
  handleDelete: (event: React.MouseEvent<HTMLElement>) => void;
  fullpage: boolean;
};

async function getPerfil(perfilId: string) {
  const response = await fetch(`http://localhost:3000/profiles/${perfilId}`);
  const jsonProfile: IProfile = await response.json();
  return jsonProfile;
}

const initializer: IProfile = {
  id: "1",
  name: "Bianca Bezerra",
  username: "biancabzra",
};

export const Post = ({
  post,
  handleDelete = (e) => {},
  fullpage = false,
}: IPostProps) => {
  const [perfil, setPerfil] = useState<IProfile>(initializer);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);
  const [isTrashed, setIsTrashed] = useState<boolean>(false);

  const likePressedRef = useRef();
  const likeUnpressedRef = useRef();

  const deslikePressedRef = useRef();
  const deslikeUnpressedRef = useRef();

  async function auxSetPerfil() {
    const postPerfil: IProfile = await getPerfil(post.user_id);
    setPerfil(postPerfil);
  }

  function handleHoverLikePressed() {}

  function handleLike() {
    setIsLiked(!isLiked);
  }

  function handleDeslike() {
    setIsDesliked(!isDesliked);
  }

  useEffect(() => {
    auxSetPerfil();
  }, []);

  return (
    <Card
      className={`w-full bg-rebeccapurple flex gap-4 p-3 border-b border-purple-400 
    ${fullpage ? "" : "h-full"}
    `}
    >
      {/* Fotinha */}
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <PostContent perfil={perfil} post={post} fullPage={fullpage} />

      <div className="flex flex-col justify-between">
        {!isLiked ? (
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
          cursor="pointer"
          style={{ cursor: "pointer", fontSize: "1rem" }}
        />
      </div>
    </Card>
  );
};

export default Post;
