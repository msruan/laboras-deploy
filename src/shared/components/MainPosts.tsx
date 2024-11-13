import { Post } from "./post/Post";
import { TextBox } from "./TextBox";
import { GetAllPosts } from "@/actions/PostAction";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./ui/spinner";

export const MainPosts = () => {
  const { response: posts, isSuccess, isError, isLoading } = GetAllPosts();
  const { user: context } = useAuth();
  const idLoggedUser = context?.uid;

  //Todo: Como faço pra quando der isError ele levar pra página de erro?
  return (
    <>
      {isLoading && <Spinner />}
      {isError && <div>Error</div>}
      <div>
        {isSuccess && idLoggedUser && (
          <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
            <TextBox linkedTo={null} />
            {posts!.map((post) => (
              <Post
                key={post.uid}
                post={post}
                fullPage={false}
                fullBorder={true}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
