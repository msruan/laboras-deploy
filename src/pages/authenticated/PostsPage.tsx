import Post from "@/shared/components/post/Post";
import { MainPosts } from "../../shared/components/MainPosts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IPost } from "@/shared/models/post";
import { GetAllPosts, GetPost } from "@/actions/PostAction";
import { getRelationedPost } from "@/actions/PostPageAction";
import { TextBox } from "@/shared/components/TextBox";
import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeftIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

function Header({ handleGoBack }: { handleGoBack: () => void }) {
  return (
    <div className="fixed justify-center items-center top-0 flex p-2 w-full bg-black border-b-[1px] border-b-gray-500 sm:hidden ">
      <ChevronLeftIcon
        cursor={"pointer"}
        onClick={handleGoBack}
        className="fixed w-6 h-6 left-3"
      ></ChevronLeftIcon>
      <h1 className="font-bold">Post</h1>
    </div>
  );
}

export const PostsPage = () => {
  const { response: posts, isSuccess } = GetAllPosts();
  const navigate = useNavigate();
  const { id } = useParams();
  const { response: post, isSuccess: isGetPostSuccess, refetch } = GetPost(id!);

  function handleGoBack() {
    navigate(-1);
  }

  let relationedPosts: IPost[] | undefined;

  if (isGetPostSuccess) {
    if (isSuccess && post) {
      relationedPosts = getRelationedPost(post, posts);
    }
  }

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <div className="flex flex-col gap-2">
      <Header handleGoBack={handleGoBack}></Header>
      <div className="max-sm:mt-8">
        {isGetPostSuccess &&
          (post ? (
            <div>
              <Post post={post} fullPage={true} fullBorder={false} />
              <TextBox linkedTo={id ?? null} />
            </div>
          ) : (
            <div>
              <p>Postagem não encontrada!!</p>
            </div>
          ))}

        {isSuccess &&
          relationedPosts?.map((_post, index) => (
            <Post key={index} post={_post} fullPage={false} fullBorder={true} />
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
