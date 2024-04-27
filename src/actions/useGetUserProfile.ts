import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axiosConfig";
import { AxiosPromise } from "axios";
import { IProfile } from "@/shared/models/profile";

async function getUserProfile(profileId : string) : AxiosPromise<IProfile> {
  return await axiosInstance.get(`/profiles/${profileId}`);
}//Todo: atualizar rota para algo como .get('<token_user>/followers);

export function useGetUserProfile(profileId : string){
  const query = useQuery({queryFn: async ()=>{ return getUserProfile(profileId)}, queryKey: ['user-profile-data']});
  return {
      ...query,
      response : query.data?.data
  };
}