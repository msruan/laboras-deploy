import axios, { AxiosPromise, AxiosResponse } from "axios";
import { useToken } from "@/shared/hooks/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IPost } from "@/shared/models/post";
import { IProfile } from "@/shared/models/profile";

type credentialsLogin = {
  email: string;
  password: string;
};

type credentialsSignup = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

const fetchLogin = async (credentials: credentialsLogin) => {
  return await axios.post(
    "http://localhost:8000/api/auth/login/",
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const Login = () => {
  const { setToken } = useToken();

  const {
    data: response,
    status,
    mutate,
  } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (): void => {
      setToken(response?.data);
    },
    onError: (error) => {
      console.log("deu ruim");
      //todo: criar mensagem de erro na tela
    },
  });

  return { status, mutate };
};

const fetchSignup = async (credentials: credentialsSignup) => {
  const response = await axios.post(
    "http://localhost:3000/profiles",
    credentials,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("fiz a req aqui no signup");
  return response;
};

export const SignUp = () => {
  const mutate = useMutation({
    mutationFn: fetchSignup,
    onSuccess: (response: AxiosResponse<IProfile>) => {
      const { mutate: handleLogin } = Login();
      const body = response.data;
      handleLogin({ email: body.email, password: body.password });
    },
  });

  return mutate;
};

export const Logout = () => {
  const { removeToken } = useToken();
  removeToken();
};
