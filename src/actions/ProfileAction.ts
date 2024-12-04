import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../config/axiosConfig";
import { AxiosPromise, AxiosResponse } from "axios";
import {
  ProfileDetailed,
  ProfileUpdate,
} from "@/shared/models/profile";

export function GetProfileById(profileId: string) {
  const fetchGetProfile = async (
    profileId: string
  ): AxiosPromise<ProfileDetailed> => {
    return await axiosInstance.get(`/users/${profileId}`);
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

export function UpdateProfile() {
  async function fetPatchProfile(profile: ProfileUpdate & {userId:string}, ) {
    const response = await axiosInstance.put(`/users/${profile.userId}`, profile);
    return response;
  }

  const queryClient = useQueryClient();
  const mutate = useMutation({
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
    ...mutate,
  };
}

export function FollowProfile(user: { id_user: string, token: string }) {
  async function fetchFollow(user: { id_user: string, token: string }) {
    const response = await axiosInstance.post(
      `/users/follow/${user.id_user}`,
    );
    return response.data;
  }
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => fetchFollow(user),
    mutationKey: ["follow"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["posts"] })
    }
  })
  return mutation;
}


export function UnfollowProfile(user: { id_user: string, token: string, username: string }) {
  const fetchUnfollow = async(user: { id_user: string, token: string, username: string })=> {
    const response = await axiosInstance.post(
      `/users/unfollow/${user.id_user}`,
    );
    return response.data
  }
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => fetchUnfollow(user),
    mutationKey: ["unfollow"],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [`users/${user.username}`] }) //Todo: o certo seria só atualizar esse dado, já que o back devolve
    }
  })
  return mutation
}

const ProfileAPI = {
  getById: GetProfileById,
  getByUsername : UpdateProfile,
  update : UpdateProfile,
  follow: FollowProfile,
  unfollow : UnfollowProfile,
}

export default ProfileAPI;