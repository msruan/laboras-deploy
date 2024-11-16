import { GetPost } from "@/actions/PostAction";
import { TextBox } from "@/shared/components/TextBox";
import Post from "@/shared/components/post/Post";
import Spinner from "@/shared/components/ui/spinner";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  const { id } = useParams();
  const navigate = useNavigate();
  const { response: post, isSuccess: isGetPostSuccess, refetch, isLoading } = GetPost(id!);

  function handleGoBack() {
    navigate(-1);
  }

  useEffect(() => {
    refetch();
  }, [id]);

  return (
    <div className="flex flex-col gap-2">
      <Header handleGoBack={handleGoBack}></Header>
      <div className="max-sm:mt-8">
        {isLoading && <Spinner />}
        
        {isGetPostSuccess &&
          (post ? (
            <div>
              <Post post={post} fullPage={true} fullBorder={false} />
              <TextBox linkedTo={id ?? null} />
              {post.comments?.map((comment) => (
                <Post
                  post={comment}
                  fullPage={false}
                  fullBorder={false}
                  key={post.uid}
                />
              ))}
            </div>
          ) : (
            <div>
              <p>Postagem não encontrada!!</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
