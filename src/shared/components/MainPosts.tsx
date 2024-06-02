import { Post } from "./post/Post";
import { TextBox } from "./TextBox";
import { GetAllPosts } from "@/actions/PostAction";
import { useAuth } from "@/context/AuthContext";

export const MainPosts = () => {
  const { response: posts, isSuccess, isError, isLoading } = GetAllPosts();
  const { user: context } = useAuth();
  const idLoggedUser = context?._id;
  isSuccess &&
    console.log("MANO OS POSTS Q RECEBI SAO ", JSON.stringify(posts));

  //Todo: Como faço pra quando der isError ele levar pra página de erro?
  return (
    <div>
      {isLoading && <div>Pedding...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <div className="flex flex-col h-full max-xl:border-0 gap-2 pl-3 pr-3 border-rebeccapurple2 border-r-2 border-l-2">
          <TextBox linkedTo={null} />
          {posts!.map((post) => (
            <Post
              key={post._id}
              post={post}
              fullPage={false}
              fullBorder={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};
