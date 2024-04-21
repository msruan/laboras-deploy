import { DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { IPost } from "../../models/post";
import { IProfile } from "../../models/profile";
import style from "./post.module.css";

interface IPostProps {
  post: IPost;
  handleDelete: (event: React.MouseEvent<HTMLElement>) => void;
}

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

export function Post({ post, handleDelete }: IPostProps) {
  const [perfil, setPerfil] = useState<IProfile>(initializer);

  async function auxSetPerfil() {
    const postPerfil: IProfile = await getPerfil(post.user_id);
    setPerfil(postPerfil);
  }

  useEffect(() => {
    auxSetPerfil();
  }, []);

  return (
    <div className={style.body}>
      <figure>
        <img className={style.img} src="src/assets/chorro-timido.JPG" alt="" />
      </figure>

      <div className={style.text}>
        <div className={style.names}>
          <h3>{perfil?.name}</h3>
          <h4>@{perfil?.username}</h4>
        </div>

        <div className={style.content}>
          <p>{post?.content}</p>
        </div>

        <footer className={style.footer}>
          <p>
            Data de publicação:{" "}
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
            {/*Todo: trocar por <date>  */}
          </p>
        </footer>
      </div>
      <i className={style.icon} onClick={handleDelete}>
        <DeleteIcon cursor="pointer" color="white" />
      </i>
    </div>
  );
}
