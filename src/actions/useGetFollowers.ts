import {useQuery} from '@tanstack/react-query'
import {axiosInstance} from '../config/axiosConfig'
import {AxiosPromise} from 'axios'
import { IProfile } from '@/shared/models/profile';

async function getFollowers() : AxiosPromise<IProfile[]> {
    return await axiosInstance.get('/profiles');
}//Todo: atualizar rota para algo como .get('<token_user>/followers);

export function useGetFollowers(){
    const query = useQuery({queryFn: getFollowers, queryKey: ['followings-data']});
    return {
        ...query,
        response : query.data?.data
    };
}