import { axiosInstance } from "@/config/axiosConfig";
import { useToken } from "@/shared/hooks/useToken";
import { useMutation } from "@tanstack/react-query";

type credentialsLogin = {
  username: string;
  password: string;
};

type credentialsSignup = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  avatar_link: string;
};

export const Login = () => {
  async function fetchLogin(credentials: credentialsLogin) {
    return await axiosInstance.post(
      "/auth/login",
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
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
    const response = await axiosInstance.post("/auth/register/", credentials);
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
