import Post from "@/shared/components/post/Post";
import { MainPosts } from "../../shared/components/MainPosts";
import { Link, useParams } from "react-router-dom";
import { IPost } from "@/shared/models/post";
import { GetAllPosts, GetPost } from "@/actions/PostAction";
import { getRelationedPost } from "@/actions/PostPageAction";
import { TextBox } from "@/shared/components/TextBox";
import { useEffect } from "react";

function Header() {
  return (
    <div className="fixed">
      <h1></h1>
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
  );
};

export default PostsPage;
