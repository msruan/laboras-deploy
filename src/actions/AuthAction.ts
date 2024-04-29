
import axios, { AxiosPromise } from 'axios';
import { useToken } from '@/shared/hooks/useToken';
import { useMutation } from '@tanstack/react-query';

interface Credentials {
    email: string,
    password: string
}

const signIn = async (credentials: Credentials) => {
    return await axios.post("http://localhost:3000/profiles", credentials, {
        headers: {'Content-Type': 'application/json'}
    })
    
}

export const Login = () => {
    const { setToken } = useToken();

    const {data: response, status, mutate } = useMutation({
        mutationFn: signIn,
        onSuccess: () :void => {
            setToken(response?.data)
        },
        onError: (error) => {
            console.log("deu ruim")
            //todo: criar mensagem de erro na tela
        }
    })
    
    return {status, mutate}
}