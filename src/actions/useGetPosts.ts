import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig.js";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { IPost } from "@/models/post.js";

const getPosts = async (): AxiosPromise<IPost[]> => {
  const response = await axiosInstance.get(`/posts`);
  return response;
};

export function useGetPosts() {
  const query = useQuery({
    queryFn: getPosts,
    queryKey: ["posts-data"],
    refetchInterval: 5 * 60 * 1000,
  });

  return {
    ...query,
    response: query.data?.data,
  };
}
