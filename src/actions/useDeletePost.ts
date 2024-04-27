import axiosInstance from '../config/axiosConfig'
import { useMutation, useQueryClient } from "@tanstack/react-query";

function deletePost(postId : string){
    return axiosInstance.delete(`/posts/${postId}`);
}

export function useDeletePostMutation(){
    const queryClient = useQueryClient();
    const mutateDelete = useMutation({mutationFn: deletePost, onSuccess:()=>{queryClient.invalidateQueries({queryKey: ['posts-data']})} });
    return mutateDelete; 
}