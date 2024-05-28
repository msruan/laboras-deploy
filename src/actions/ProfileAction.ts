import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance, {
  axiosBackInstance,
  axiosNextInstance,
} from "@/config/axiosConfig";
import { AxiosPromise, AxiosResponse } from "axios";
import { IProfile, ProfileRequest } from "@/shared/models/profile";
import { IPost } from "@/shared/models/post";

async function fetchGetUsers(): AxiosPromise<IProfile[]> {
  return await axiosNextInstance.get("/profiles");
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetUsers() {
  const query = useQuery({
    queryFn: fetchGetUsers,
    queryKey: ["followings"],
  });
  return {
    ...query,
    response: query.data?.data,
  };
}

async function fetchGetProfileById(profileId: string): AxiosPromise<IProfile> {
  return await axiosNextInstance.get(`/profiles/id/${profileId}`);
} //Todo: atualizar rota para algo como .get('<token_user>/followers);

export function GetProfileById(profileId: string) {
  const query = useQuery({
    queryFn: async () => {
      return fetchGetProfileById(profileId);
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
  return await axiosNextInstance.get(`/profiles/username/${username}`);
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

export const fetchGetProfilePosts = async (
  item: any
): AxiosPromise<IPost[]> => {
  const response = await axiosBackInstance.get(
    `/user/${item.username}/posts/`,
    {
      headers: { Authorization: `Token ${item.token}` },
    }
  );
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
