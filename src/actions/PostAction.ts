import {
  axiosNextInstance,
} from "./../config/axiosConfig";
import { IPost, PostRequest } from "@/shared/models/post.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosPromise, AxiosResponse } from "axios";

async function fetchCreatePost(postagem: IPost) {
  return await axiosNextInstance.post("/posts", postagem);
}

export function CreatePost() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchCreatePost,
    onSuccess: () => {
      console.log("crei o post mano");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutate;
}

export const fetchGetPosts = async (): AxiosPromise<IPost[]> => {
  const response = await axiosNextInstance.get(`/posts`);
  console.log("mana os posts q o next me devolveu foram " + response.data);
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
  const response = await axiosNextInstance.get(`/posts/${id}`);
  return response;
};

export function GetPostById(id: string) {
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
  return await axiosNextInstance.patch(`/posts/${post.id}`, post);
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
  return await axiosNextInstance.delete(`/posts/${postId}`);
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
