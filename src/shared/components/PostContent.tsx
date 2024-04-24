import { IPost } from "@/models/post";
import { IProfile } from "@/models/profile";
import {  CardContent } from "./ui/card";

interface IPostContentProps {
  perfil: IProfile;
  post: IPost;
}

export function PostContent({perfil, post}: IPostContentProps) {
    return (<CardContent className="flex gap-8 w-full break-all p-0 ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center text-aliceblue text-sm gap-1.5">
          <h3>{perfil?.name}</h3>
          <h4 className="opacity-70">@{perfil?.username}</h4>
        </div>

        <div className="text-aliceblue font-sans text-base w-full">
          <p>{post?.content}</p>
        </div>

        <footer className="text-white opacity-70 text-sm">
          <p>
            Data de publicação:{" "}
            <p>{new Date(post.created_at).toLocaleDateString()}</p>
            {/*Todo: trocar por <date>  */}
          </p>
        </footer>
      </div>
    </CardContent>)
}
