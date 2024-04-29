import { IPost, PostRequest } from "@/shared/models/post.js";
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

async function fetchPutPost(post: IPost): AxiosPromise<IPost> {
  return await axiosInstance.put(`/posts/${post.id}`, post);
}

export function PutPost() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: fetchPutPost,
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
  const mutate = useMutation({
    mutationFn: fetchDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutate;
}

function validatePacthParameters({
  id,
  content,
  likes,
  deslikes,
}: PostRequest) {
  if (content == "" && likes == -1 && deslikes == -1) {
    throw new Error(
      "Nenhum atributo a ser atualizado foi passado para PatchPost deve ser nulo!"
    );
  } else if (content !== "") {
    return {
      id,
      content,
    };
  } else if (likes !== -1 && deslikes !== -1) {
    return {
      id,
      likes,
      deslikes,
    };
  } else if (likes !== -1) {
    return {
      id,
      likes,
    };
  }
  return {
    id,
    deslikes,
  };
}

async function fetchPatchPost({
  id,
  content = "",
  likes = -1,
  deslikes = -1,
}: PostRequest): AxiosPromise<IPost> {
  return await axiosInstance.patch(
    `/posts/${id}`,
    validatePacthParameters({
      id,
      content,
      likes,
      deslikes,
    })
  );
}

export function PatchPost() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: fetchPatchPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return mutate;
}
