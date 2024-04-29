import { IPost } from "@/shared/models/post.js";
import axiosInstance from "../config/axiosConfig.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";

async function fetchCreatePost(postagem: IPost) {
  return await axiosInstance.post("/posts", postagem);
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

const fetchGetPosts = async (): AxiosPromise<IPost[]> => {
  const response = await axiosInstance.get(`/posts`);
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

async function fetchUpdatePost(post: IPost): AxiosPromise<IPost> {
  return await axiosInstance.put(`/posts/${post.id}`, post);
}

export function UpdatePost() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: fetchUpdatePost,
    onSuccess: (response: AxiosResponse<IPost>) => {
      queryClient.setQueryData(["posts"], (oldPosts: IPost[]) => {
        oldPosts.map((post) => {
          if (post.id === response.data.id) return response.data;
          return post;
        });
      });
    },
  });
  return mutate;
}

async function fetchDeletePost(postId: string) {
  return await axiosInstance.delete(`/posts/${postId}`);
}

export function DeletePost() {
  const queryClient = useQueryClient();
  const mutateDelete = useMutation({
    mutationFn: fetchDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutateDelete;
}
