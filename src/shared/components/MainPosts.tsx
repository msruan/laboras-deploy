import { Post } from "./Post";
import { TextBox } from "./TextBox";
import { useEffect, useState } from "react";
import { IPost } from "../models/post";
import { usePostsData } from "@/../actions/usePostData";

type MainPostsProps = {
  idLoggedUser: string;
};
export const MainPosts = ({ idLoggedUser }: MainPostsProps) => {
  // const [posts, setPosts] = useState<IPost[]>([]);

  const { response, status } = usePostsData();
  const query = usePostsData()
  // function addNewPost(newPost: IPost) {
  //   setPosts([...posts, newPost]);
  // }
  // if(!isLoading){
  // return <div>Loading</div>

  useEffect(() => {
    if (status === "success") {
      console.log("Its succecsss");

      if (query.isSuccess) {
        console.log(response);
      }
    } else if (status === "error") {
      console.log("Error");
    }
  }, [status]);

  return (
    <div>
      {status === "pending" && <div>Pedding</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <div className="flex flex-col h-full gap-2 pl-3 pr-3">
          {response!.map(
            (post) => (
              (<Post key={post.id} post={post} fullpage={false} fullBorder={true} />)
            )
          )}
        </div>
      )}
    </div>
  );

  // return status === "success" ? (
  // ) : (
  //   <div>adjfas</div>
  // );
};
