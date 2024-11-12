import axiosInstance from "./../config/axiosConfig";
import { IPost, PostRequest, Posts } from "@/shared/models/post.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";

async function fetchInteractPost(action: "like" | "dislike", post_id: string) {
  return await axiosInstance.post(`/posts/${post_id}/${action}`);
}

export function InteractPost(action: "like" | "dislike") {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: (post_id: string) => fetchInteractPost(action, post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return mutate;
}


async function fetchCommentPost(comentario: PostRequest) {
  return await axiosInstance.post(`/posts/${comentario.uid}/comment`, { content: comentario.content }, {
    headers: {
      Authorization: `Bearer ${comentario.token}`,
    },
  });
}


export function CommentPost() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchCommentPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  return mutate;
}


async function fetchCreatePost(postagem: PostRequest) {
  return await axiosInstance.post("/posts", { content: postagem.content }, {
    headers: {
      Authorization: `Bearer ${postagem.token}`,
    },
  });
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
async function fetchCreatePostJsonServer(postagem: IPost) {
  return await axiosInstance.post("/posts", postagem);
  // return await axiosInstance.post("/posts", postagem);
}

export function CreatePostJsonServer() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchCreatePostJsonServer,
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
  console.log("query",query.data?.data.posts)
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
      return fetchGetPost(id);
    },
    queryKey: ["post"],
    refetchInterval: 5 * 60 * 1000,
  });

  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetchPatchPost(post: PostRequest): AxiosPromise<IPost> {
  return await axiosInstance.put(`/posts/${post.uid}`, { content: post.content });
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
