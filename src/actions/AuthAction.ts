import axios, { AxiosPromise, AxiosResponse } from "axios";
import { useToken } from "@/shared/hooks/useToken";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IPost } from "@/shared/models/post";
import { ProfileDetailed } from "@/shared/models/profile";
import { useContext } from "react";
import { useAuth } from "@/context/AuthContext";
import { GetProfileByUsername } from "./ProfileAction";
import { axiosInstance } from "@/config/axiosConfig";

type credentialsLogin = {
  username: string;
  password: string;
};

type credentialsSignup = {
  full_name: string;
  username: string;
  email: string;
  password: string;
};

export const Login = () => {
  async function fetchLogin(credentials: credentialsLogin) {
    return await axios.post("http://localhost:8000/auth/login", credentials, {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { setToken } = useToken();

  const mutation = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (response, variables) => {
      sessionStorage.setItem("username", variables.username);
      setToken(response?.data);
    },
    onError: (error) => {
      console.log("deu ruim " + error);
      //todo: criar mensagem de erro na tela
    },
  });

  return mutation;
};

export const SignUp = () => {
  async function fetchSignup(credentials: credentialsSignup) {
    const response = await axios.post(
      "http://localhost:8000/auth/register/",
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("fiz a req aqui no signup");
    return response;
  }

  const mutate = useMutation({
    mutationFn: fetchSignup,
    // onSuccess: (response: AxiosResponse<IProfile>) => {
    //   //@Todo: perguntar pra Bianca se isso tava funcionando, se não tiver, apenas redirecionar o usuário para Login e alertar que o signup teve sucesso
    //   const { mutate: handleLogin } = Login();
    //   const body = response.data;
    //   handleLogin({ email: body.email, password: body.password });
    // },
  });

  return mutate;
};

export const Logout = () => {
  const { removeToken } = useToken();
  removeToken();
};
