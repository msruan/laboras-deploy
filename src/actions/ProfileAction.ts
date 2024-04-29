import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosConfig";
import { AxiosPromise } from "axios";
import { IProfile } from "@/shared/models/profile";

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
