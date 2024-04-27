import { IProfile } from "@/models/profile";
import axiosInstance from "../config/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import{AxiosPromise} from 'axios'

async function getProfiles() : AxiosPromise<IProfile[]> {
  return await axiosInstance.get("/profiles");
}

export function useGetProfiles() {
  const query = useQuery({ queryFn: getProfiles, queryKey: ["profiles-data"] });
  return {
    ...query,
    response: query.data?.data,
  };
}
