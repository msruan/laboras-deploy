import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";
import { AxiosPromise, AxiosResponse } from "axios";
import {
  ProfileBase,
  ProfileDetailed,
  ProfileUpdate,
} from "@/shared/models/profile";
import { IPost } from "@/shared/models/post";

async function fetchGetProfile(
  profileId: string
): AxiosPromise<ProfileDetailed> {
  return await axiosInstance.get(`/users/${profileId}`);
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetProfileById(profileId: string) {
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

export const fetchGetProfileByUsername = async (
  username: string
): AxiosPromise<ProfileDetailed[]> => {
  const response = await axiosInstance.get(`/users/${username}`);
  return response;
};

export function GetProfileByUsername(username: string) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfileByUsername(username);
    },
    queryKey: [`users/${username}`],
  });

  return {
    ...query,
    response: query.data?.data[0],
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
