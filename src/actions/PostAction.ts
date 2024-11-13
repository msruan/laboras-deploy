import { IPost, PostRequest, Posts } from "@/shared/models/post.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise } from "axios";
import axiosInstance from "./../config/axiosConfig";

async function fetchInteractPost(action: "like" | "dislike", post_id: string) {
  return await axiosInstance.post(`/posts/${post_id}/${action}`);
}

export function InteractPost(action: "like" | "dislike") {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (post_id: string) => fetchInteractPost(action, post_id),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`post-${variables}`],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return mutate;
}

async function fetchCommentPost(postagem: PostRequest) {
  return await axiosInstance.post(
    `/posts/${postagem.uid}/comment`,
    { content: postagem.content },
    {
      headers: {
        Authorization: `Bearer ${postagem.token}`,
      },
    }
  );
}

export function CommentPost() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchCommentPost,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [`post-${variables.uid}`],
      });
    },
  });
  return mutate;
}

async function fetchCreatePost(postagem: PostRequest) {
  return await axiosInstance.post(
    "/posts",
    { content: postagem.content },
    {
      headers: {
        Authorization: `Bearer ${postagem.token}`,
      },
    }
  );
}

export function CreatePost() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchCreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutate;
}

export const fetchGetPosts = async (): AxiosPromise<Posts> => {
  const response = await axiosInstance.get(`/posts/feed`);
  return response;
};

export function GetAllPosts() {
  const query = useQuery({
    queryFn: fetchGetPosts,
    queryKey: ["posts"],
    refetchInterval: 5 * 60 * 1000,
  });

  return {
    ...query,
    response: query.data?.data.posts,
  };
}

export const fetchGetPost = async (id: string): AxiosPromise<IPost> => {
  const response = await axiosInstance.get(`/posts/${id}`);
  return response;
};

export function GetPost(id: string) {
  const query = useQuery({
    queryFn: () => {
      console.log("pedi o id: ", id);
      return fetchGetPost(id);
    },
    queryKey: [`post-${id}`],
    refetchInterval: 5 * 60 * 1000,
  });

  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetchPatchPost(post: PostRequest): AxiosPromise<IPost> {
  return await axiosInstance.put(`/posts/${post.uid}`, {
    content: post.content,
  });
}

export function UpdatePost() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: fetchPatchPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutate;
}

async function fetchDeletePost(postId: string) {
  return await axiosInstance.delete(`/posts/${postId}`);
}

export function DeletePost() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutate;
}
