import { Post } from "./Post";
import { TextBox } from "./TextBox";
import { GetAllPosts } from "@/actions/PostAction";

type MainPostsProps = {
  idLoggedUser: string;
};

export const MainPosts = ({ idLoggedUser }: MainPostsProps) => {
  
  const { response: posts, isSuccess, isError, isLoading } = GetAllPosts();

  //Todo: Como faço pra quando der isError ele levar pra página de erro?
  return (
    <div>
      {isLoading && <div>Pedding</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <div className="flex flex-col h-full gap-2 pl-3 pr-3">
          <TextBox idLoggedUser={idLoggedUser}/>
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
