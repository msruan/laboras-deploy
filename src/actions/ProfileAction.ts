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

export function GetProfileById(profileId: string) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfile(profileId);
    },
    queryKey: [`profile/${profileId}`],
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
    queryKey: [`profile/${username}`],
  });

  return {
    ...query,
    response: query.data?.data[0],
  };
}

export const fetchGetProfileByEmail = async (
  email: string
): AxiosPromise<IProfile[]> => {
  const response = await axiosInstance.get(`/profiles?email=${email}`);
  return response;
};

export function GetProfileByEmail(email: string, enabled: boolean) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfileByEmail(email);
    },
    queryKey: [`profile/${email}`],
    enabled: enabled,
  });

  return {
    ...query,
    response: query.data?.data[0],
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
      //Todo: essa queryKey vai dar uma bagunça muito grande
      queryClient.setQueryData(["profile"], (oldProfile: IProfile) => {
        response.data;
      });
    },
  });
  return {
    mutation,
  };
}
