import { useContext } from "react";
import { Post } from "./Post";
import { TextBox } from "./TextBox";
import { GetAllPosts } from "@/actions/PostAction";
import { LoggedUserContext } from "@/context/LoggedUserContext";

export const MainPosts = () => {
  const { response: posts, isSuccess, isError, isLoading } = GetAllPosts();
  const {profile : context} = useContext(LoggedUserContext);
  const idLoggedUser = context?.id;

  //Todo: Como faço pra quando der isError ele levar pra página de erro?
  return (
    <div>
      {isLoading && <div>Pedding...</div>}
      {isError && <div>Error</div>}
      {isSuccess && idLoggedUser && (
        <div className="flex flex-col h-full gap-2 pl-3 pr-3">
          <TextBox linkedTo={null} />
          {posts!.map((post) => (
            <Post
              key={post.id}
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
