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

  function handleDelete(id: string) {
    const newPosts = posts.filter((post) => post.id !== id);

    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setPosts(newPosts);
    });
  }

  useEffect(() => {
    auxSetPosts();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <TextBox idLoggedUser={idLoggedUser} addNewPost={addNewPost} />
      {posts.map((post) => (
        <Post post={post} handleDelete={() => handleDelete(post.id)} />
      ))}
    </div>
  );
};

async function getPosts(): Promise<IPost[]> {
  const response = await fetch(`http://localhost:3000/posts`);
  const jsonPosts: IPost[] = await response.json();
  console.log(jsonPosts);
  return jsonPosts;
}
