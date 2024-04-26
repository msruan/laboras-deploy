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

  const data, isLoading} = usePostsData();

  
  
  // function addNewPost(newPost: IPost) {
    //   setPosts([...posts, newPost]);
    // }
    // if(!isLoading){
      // return <div>Loading</div>
      
      return (
        <div className="flex flex-col h-full gap-2 pl-3 pr-3">
        {/* <TextBox idLoggedUser={idLoggedUser} addNewPost=()=>{}} /> */}
        
        {/* <h1>{`${response?.posts}`}</h1> */}
        {response?.data.posts.map((post) => (
          <Post post={post} fullpage={false} fullBorder={true} />
        ))}
      </div>
    );
  // }
};
 
