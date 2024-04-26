import { Post } from "./Post";
import { TextBox } from "./TextBox";
import { useEffect, useState } from "react";
import { IPost } from "../models/post";

type MainPostsProps = {
  idLoggedUser: string;
};

export const MainPosts = ({ idLoggedUser }: MainPostsProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  async function auxSetPosts() {
    setPosts(await getPosts());
  }

  function addNewPost(newPost: IPost) {
    setPosts([...posts, newPost]);
  }

  

  useEffect(() => {
    auxSetPosts();
  }, []);

  return (
    <div className="flex flex-col h-full gap-2 pl-3 pr-3">
      <TextBox idLoggedUser={idLoggedUser} addNewPost={addNewPost} />
      {posts.map((post) => (
        <Post post={post} handleDelete={() => handleDelete(post.id)} fullpage={false} fullBorder={true} />
      ))}
    </div>
  );
};

