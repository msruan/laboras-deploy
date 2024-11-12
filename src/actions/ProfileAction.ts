import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";
import { AxiosPromise, AxiosResponse } from "axios";
import {
  ProfileBase,
  ProfileDetailed,
  ProfileUpdate,
} from "@/shared/models/profile";
import { IPost } from "@/shared/models/post";

export function GetProfileById(profileId: string) {
  const fetchGetProfile = async (
    profileId: string
  ): AxiosPromise<ProfileDetailed> => {
    const res = await axiosInstance.get(`/users/${profileId}`);
    return res;
  };
  //Todo: atualizar rota para algo como .get('<token_user>/followers);

  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfile(profileId);
    },
    queryKey: [`users/${profileId}`],
  });
  return {
    ...query,
    response: query.data?.data,
  };
}

export function GetProfileByUsername(id: string) {
  const fetchGetProfileById = async (
    id: string
  ): AxiosPromise<ProfileDetailed> => {
    const response = await axiosInstance.get(`/users/${id}`);
    
    return response;
  };

  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfileById(id);
    },
    queryKey: [`users/${id}`],
  });

  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetPatchProfile(profile: ProfileUpdate) {
  const response = await axiosInstance.put(`/users/`, profile);
  return response;
}

export function UpdateProfile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetPatchProfile,
    //@Todo: o back ta retornando esse Profile?
    onSuccess: (response: AxiosResponse<ProfileUpdate>) => {
      //Todo: essa queryKey vai dar uma bagunça muito grande
      queryClient.setQueryData(["profile"], (oldProfile: ProfileDetailed) => {
        response.data;
      });
    },
  });
  return {
    mutation,
  };
}

export const fetchGetProfilePosts = async (
  item: any
): AxiosPromise<IPost[]> => {
  const response = await axiosInstance.get(`/user/${item.username}/`, {
    headers: { Authorization: `Token ${item.token}` },
  });
  return response;
};

export function GetProfilePosts(item: any) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfilePosts(item);
    },
    queryKey: [`posts-${item.username}`],
  });

  return {
    ...query,
    response: query.data?.data,
  };
}
