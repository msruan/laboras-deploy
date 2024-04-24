import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardTitle } from "./ui/card";
import { BeakerIcon } from '@heroicons/react/24/solid'
import {HandThumbDownIcon, HandThumbUpIcon} from "@heroicons/react/24/solid";

import {
  HeartIcon,
  HeartFilledIcon,
  TrashIcon,
  Cross1Icon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { PostContent } from "./PostContent";

type IPostProps = {
  post: IPost;
  handleDelete: (event: React.MouseEvent<HTMLElement>) => void;
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

export const Post = ({ post, handleDelete }: IPostProps) => {
  const [perfil, setPerfil] = useState<IProfile>(initializer);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDesliked, setIsDesliked] = useState<boolean>(false);

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
    <Card className="w-full bg-rebeccapurple flex gap-4 p-3 border-b border-purple-400">
      {/* Fotinha */}
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Dialog>
        <DialogTrigger className="w-full flex flex-row text-start">
          <PostContent perfil={perfil} post={post} />
        </DialogTrigger>
        <i className="ml-auto pr-5" onClick={handleDelete}>
          <TrashIcon cursor="pointer" color="white" />
        </i>
        <i onClick={handleLike}>
          {isLiked ? (
            <>
            {/* <BeakerIcon className="h-6 w-6 text-blue-500" /> */}
            <HeartFilledIcon
              // ref={likePressedRef}   
              cursor="pointer"
              color="purple"
            />
            </>
          ) : (
            <>
            <HeartIcon cursor="pointer" color="white" />
            {/* <BeakerIcon className="h-6 w-6 text-blue-500" /> */}
            </>
          )}
        </i>
        {/* <i onClick={handleDeslike}>
          {isDesliked ? (
          ) : (
          )}
        </i> */}
        <DialogContent>
          Data de publicação:{" "}
          <p>{new Date(post.created_at).toLocaleDateString()}</p>
          {/*Todo: trocar por <date>  */}
          {/* </p>
                </footer>
              </div> */}
          {/* </CardContent> */}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Post;
