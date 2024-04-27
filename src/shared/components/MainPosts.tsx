import { Post } from "./Post";
import { TextBox } from "./TextBox";
import { useEffect, useState } from "react";
import { IPost } from "../models/post";
import { useGetPosts } from "../../actions/useGetPosts";
import { useAddPostMutation } from "../../actions/useAddPost";
import { useDeletePostMutation } from "../../actions/useDeletePost";

type MainPostsProps = {
  idLoggedUser: string;
};

export const MainPosts = ({ idLoggedUser }: MainPostsProps) => {
  const { response: posts, isSuccess, isError, isLoading } = useGetPosts();
  const { mutate : addNewPost} = useAddPostMutation();
  const {mutate : deletePost} = useDeletePostMutation();

  //Como faço pra quando der isError ele levar pra página de erro?
  return (
    <div>
      {isLoading && <div>Pedding</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <div className="flex flex-col h-full gap-2 pl-3 pr-3">
          <TextBox idLoggedUser={idLoggedUser} addNewPost={addNewPost} />
          {posts!.map((post) => (
            <Post
              key={post.id}
              post={post}
              fullpage={false}
              fullBorder={true}
              handleDelete={deletePost}
            />
          ))}
        </div>
      )}
    </div>
  );

  // return status === "success" ? ( CO
  // ) : (
  //   <div>adjfas</div>
  // );
};
