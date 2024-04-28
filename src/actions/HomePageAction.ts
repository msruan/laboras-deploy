import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosConfig";
import { AxiosPromise } from "axios";
import { IProfile } from "@/shared/models/profile";

async function fetchGetFollowers(): AxiosPromise<IProfile[]> {
  return await axiosInstance.get("/profiles");
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetUserFollowers() {
  const query = useQuery({
    queryFn: fetchGetFollowers,
    queryKey: ["followings"],
  });
  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetchGetUserProfile(profileId: string): AxiosPromise<IProfile> {
  return await axiosInstance.get(`/profiles/${profileId}`);
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetUserProfile(profileId: string) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetUserProfile(profileId);
    },
    queryKey: ["user-profile"],
  });
  return {
    ...query,
    response: query.data?.data,
  };
}
