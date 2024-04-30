import { IPost } from "@/shared/models/post";
import { IProfile } from "@/shared/models/profile";
import { CardContent, CardFooter } from "./ui/card";
import { Icons } from "./Icons";
import { PatchPost } from "@/actions/PostAction";
import { PostMenu } from "./PostMenu";

interface IPostContentProps {
  perfil: IProfile;
  post: IPost;
  fullPage: boolean;
  handleEdit : (value: boolean)=>void;
}

export function PostContent({ perfil, post, fullPage, handleEdit }: IPostContentProps) {
  const { mutate: handleUpdate } = PatchPost();

  return (
    <>
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
          <footer
            className={`text-white opacity-70 text-xs mt-10 border-t-purple-50 flex items-center`}
          >
            <p className="w-3/4">
              Data de publicação:{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div
              className={`flex flex-row justify-between pr-7 pb-1 h-fit
      ${fullPage ? " w-1/4" : " w-1/4"}
      `}
            >
              <Icons post={post} fullPage={fullPage}></Icons>
              <PostMenu handleEdit={handleEdit} post={post}></PostMenu>
            </div>
          </footer>
        ) : (
          <></>
        )}
      </CardContent>
    </>
  );
}
