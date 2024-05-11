import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";
import { AxiosPromise, AxiosResponse } from "axios";
import { IProfile, ProfileRequest } from "@/shared/models/profile";

async function fetchGetProfileFollowers(): AxiosPromise<IProfile[]> {
  return await axiosInstance.get("/profiles");
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetProfileFollowers() {
  const query = useQuery({
    queryFn: fetchGetProfileFollowers,
    queryKey: ["followings"],
  });
  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetchGetProfile(profileId: string): AxiosPromise<IProfile> {
  return await axiosInstance.get(`/profiles/${profileId}`);
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetUserProfile(profileId: string) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfile(profileId);
    },
    queryKey: ["user-profile"],
  });
  return {
    ...query,
    response: query.data?.data,
  };
}

export const fetchGetProfileByUsername = async (
  username: string
): AxiosPromise<IProfile[]> => {
  const response = await axiosInstance.get(`/profiles?username=${username}`);
  return response;
};

export function GetProfileByUsername(username: string) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfileByUsername(username);
    },
    queryKey: ["profile"],
  });

  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetPatchProfile(profile: ProfileRequest) {
  const response = await axiosInstance.put(`/profiles/${profile.id}`, profile);
  return response;
}

export function UpdateProfile() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: fetPatchProfile,
    //@Todo: o back ta retornando esse Profile?
    onSuccess: (response: AxiosResponse<ProfileRequest>) => {
      queryClient.setQueryData(["profile"], (oldProfile: IProfile) => {
        response.data;
      });
    },
  });
  return {
    mutation,
  };
}
