import { IPost } from "@/shared/models/post";
import { IProfile } from "@/shared/models/profile";
import { CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface IPostContentProps {
  perfil: IProfile;
  post: IPost;
  fullPage: boolean;
}

export function PostContent({ perfil, post, fullPage }: IPostContentProps) {
  return (
    <CardContent className="flex flex-col justify-between w-full break-all">
      <div className="flex flex-col gap-4">
        <div
          className={`flex ${
            fullPage ? "flex-col" : ""
          } items-start text-aliceblue text-sm gap-2`}
        >
          <h3>{perfil?.name}</h3>
          <h4 className="opacity-70">@{perfil?.username}</h4>
        </div>

        <div className="text-aliceblue font-sans text-base w-full">
          <p>{post?.content}</p>
        </div>
      </div>
      {fullPage ? (
        <footer className={`text-white opacity-70 text-xs mt-10 border-t-purple-50`}>

          <p>
            Data de publicação: {new Date(post.created_at).toLocaleDateString()}
            {/*Todo: trocar por <date>  */}
          </p>
        </footer>
      ) : (
        <></>
      )}
    </CardContent>
  );
}
