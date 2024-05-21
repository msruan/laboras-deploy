import Post from "@/shared/components/post/Post";
import { MainPosts } from "../../shared/components/MainPosts";
import { Link, useParams } from "react-router-dom";
import { IPost } from "@/shared/models/post";
import { GetAllPosts, GetPost } from "@/actions/PostAction";
import { getRelationedPost } from "@/actions/PostPageAction";
import { TextBox } from "@/shared/components/TextBox";
import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function Header() {
  return (
    <div className="fixed top-0 w-full h-5 bg-black sm:hidden">
      <Button>
        <ArrowLeftIcon className="w-6 h-6"></ArrowLeftIcon>
      </Button>
      <h1>Post</h1>
    </div>
  );
}

export const PostsPage = () => {
  const { response: posts, isSuccess } = GetAllPosts();
  const { id } = useParams();
  const { response: post, isSuccess: isGetPostSuccess, refetch } = GetPost(id!);

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
      <Header></Header>
      <div className="max-">
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
