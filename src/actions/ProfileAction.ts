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

export function GetProfileByUsername(username: string) {
  const fetchGetProfileByUsername = async (
    id: string
  ): AxiosPromise<ProfileDetailed> => {
    const response = await axiosInstance.get(`/users/${username}`);

    return response;
  };

  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfileByUsername(username);
    },
    queryKey: [`users/${username}`],
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


async function fetchFollow(user: { id_user: string, token: string }) {
  const response = await axiosInstance.post(
    `/users/follow/${user.id_user}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  return response.data;
}

export function FollowProfile(user: { id_user: string, token: string }) {
  const query = useQuery({
    queryFn: () => fetchFollow(user),
    queryKey: ["follow"]
  })
  return {
    ...query,
    response: query.data
  }
}
