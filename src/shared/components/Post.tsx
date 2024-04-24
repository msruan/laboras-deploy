import { IPost } from "../models/post";
import { IProfile } from "../models/profile";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

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

  async function auxSetPerfil() {
    const postPerfil: IProfile = await getPerfil(post.user_id);
    setPerfil(postPerfil);
  }

  useEffect(() => {
    auxSetPerfil();
  }, []);

  return (
    <Card className="w-full bg-rebeccapurple flex gap-4 p-3 border-b border-purple-400">
      {/* Fotinha */}
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src="src/assets/chorro-timido.JPG" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardContent className="flex flex-col gap-1 break-all p-0">
        <div className="flex flex-row items-center text-aliceblue text-sm gap-1.5">
          <h3>{perfil?.name}</h3>
          <h4 className="opacity-70">@{perfil?.username}</h4>
        </div>

        <div className="text-aliceblue font-sans text-base w-96">
          <p>{post?.content}</p>
        </div>

        <footer className="text-white opacity-70 text-sm">
          <p>
            Data de publicação:{" "}
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
            {/*Todo: trocar por <date>  */}
          </p>
        </footer>
      </CardContent>

      <i className="ml-auto pr-5" onClick={handleDelete}>
        <DeleteIcon cursor="pointer" color="white" />
      </i>
    </Card>
  );
};

export default Post;
