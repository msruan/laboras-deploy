import axiosInstance, { axiosBackInstance } from "./../config/axiosConfig";
import { IPost, PostRequest } from "@/shared/models/post.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";

async function fetchCreatePost(postagem: any) {
  return await axiosBackInstance.post("/posts", postagem, {
    headers: {
      Authorization: `Token ${postagem.token}`,
    },
  });
  // return await axiosInstance.post("/posts", postagem);
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

export const fetchGetPosts = async (): AxiosPromise<IPost[]> => {
  const response = await axiosBackInstance.get(`/posts`);
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
    response: query.data?.data,
  };
}

export const fetchGetPost = async (id: string): AxiosPromise<IPost> => {
  const response = await axiosInstance.get(`/posts/${id}`);
  console.log("mana o id foi... ", id);
  console.log("mano...");
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
  return await axiosInstance.patch(`/posts/${post.id}`, post);
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
