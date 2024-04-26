import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig.js";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { PostsResponse, IPost } from "@/models/post.js";

const fetchPosts = async (): AxiosPromise<IPost[]>  => {
  const response = await axios.get(`http://localhost:3000/posts`);
  // console.log(response.data);
  return response;
};

export function usePostsData(){
  const query = useQuery({ queryFn: fetchPosts, queryKey: ["posts-data"], refetchInterval: 2000});
  // console.log("Posts")
  // console.log(query.data?.data)

  return {
    ...query,
    response: query.data?.data
  }
}


