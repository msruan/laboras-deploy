import { UpdatePost } from "@/actions/PostAction";
import { IPost } from "@/shared/models/post";
import { ProfileBase } from "@/shared/models/profile";
import { Link } from "react-router-dom";
import { CardContent } from "../ui/card";
import { Icons } from "./Icons";
import { PostMenu } from "./PostMenu";

interface IPostContentProps {
  perfil: ProfileBase;
  post: IPost;
  fullPage: boolean;
  onClick: () => void;
  handleEdit: (value: boolean) => void;
}

export function PostContent({
  perfil,
  post,
  fullPage,
  handleEdit,
  onClick,
}: IPostContentProps) {
  const { mutate: handleUpdate } = UpdatePost();

  return (
    <>
      <CardContent
        onClick={onClick}
        className="flex flex-col justify-between w-full break-all"
      >
        <div className="flex flex-col gap-4">
          <div
            className={`flex ${
              fullPage ? "flex-col" : ""
            } items-start text-aliceblue text-sm gap-2`}
          >
            <Link to={`/users/${perfil?.uid}`}>
              <h3>{perfil?.full_name}</h3>
            </Link>
            <Link to={`/users/${perfil?.uid}`}>
              <h4 className="opacity-70">@{perfil?.username}</h4>
            </Link>
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
              <Icons post={post}></Icons>
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
