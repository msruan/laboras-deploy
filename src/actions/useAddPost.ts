import { IPost } from "@/shared/models/post.js";
import axiosInstance from "../config/axiosConfig.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addPost(postagem: IPost) {
  return await axiosInstance.post("/posts", postagem);
}

export function useAddPostMutation() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts-data']});
    },
  });
  return mutate;
}
