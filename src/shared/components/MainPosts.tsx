import { Post } from "./post/Post";
import { TextBox } from "./TextBox";
import { GetAllPosts } from "@/actions/PostAction";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./ui/spinner";
import Seo from "@/shared/components/Seo";

export const MainPosts = () => {
  const { response: posts, isSuccess, isError, isLoading } = GetAllPosts();
  const { user: context } = useAuth();
  const idLoggedUser = context?.uid;

  //Todo: Como faço pra quando der isError ele levar pra página de erro?
  return (
    <>
      <Seo title="Laboras" />
      {isLoading && <Spinner />}
      {isError && <Spinner error />}
      <div>
        {
          <div className="flex justify-evenly">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <img src="src/assets/blinkers.gif" height={150} width={150} />
            ))}
          </div>
        }
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
