import { Post } from "./post/Post";
import { TextBox } from "./TextBox";
import { GetAllPosts } from "@/actions/PostAction";
import Spinner from "./ui/spinner";
import Seo from "@/shared/components/Seo";
import blinkers from "@/assets/blinkers.gif";

export const MainPosts = () => {
  const { response: posts, isSuccess, isError, isLoading } = GetAllPosts();

  const isDecember = new Date().getMonth() === 11;

  //Todo: Como faço pra quando der isError ele levar pra página de erro?
  return (
    <>
      <Seo title="Laboras" />
      {isLoading && <Spinner />}
      {isError && <Spinner error />}
      <div>
        {isDecember && (
          <div
            style={{
              backgroundImage: `url('${blinkers}')`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "150px 150px",
            }}
            className={`w-full h-[150px]`}
          ></div>
        )}
        {isSuccess && (
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
