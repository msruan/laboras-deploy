import { Login } from "@/actions/AuthAction";
import { GetProfileByEmail } from "@/actions/ProfileAction";
import axiosInstance, { axiosBackInstance } from "@/config/axiosConfig";
import { useToken } from "@/shared/hooks/useToken";
import { IProfile } from "@/shared/models/profile";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { useState, createContext, ReactNode, useContext } from "react";

export function useAuth() {
  return useContext(AuthContext);
}

type CredentialsLogin = {
  email: string;
  password: string;
};

export type LoggedUserContextType = {
  user: IProfile | null;
  signed: boolean;
  // handleChange: ({ username, id }: LoggedUserInfo) => void;
  Login(credentials: CredentialsLogin): Promise<void>;
};

const AuthContext = createContext<LoggedUserContextType>(
  {} as LoggedUserContextType
);

type LoggedUserInfo = {
  username: string;
  id: string;
};

export const LoggedUserProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<IProfile | null>(null);

  // const handleChange = ({ username, id }: LoggedUserInfo) => {
  //   setUser((oldProfile) => {
  //     let copy: LoggedUserInfo = { ...oldProfile } as LoggedUserInfo;
  //     copy.username = username ?? copy.username;
  //     copy.id = id ?? copy.id;
  //     return copy;
  //   });
  // };

  async function Login(credentials: CredentialsLogin) {
    const { setToken } = useToken();
    const responseToken: AxiosResponse<{ token: string }> =
      await axiosBackInstance.post("/auth/login/", credentials);
    const responseUser: AxiosResponse<IProfile[]> = await axiosInstance.get(
      `/profiles?email=${credentials.email}`
    );
    sessionStorage.setItem("email", credentials.email);
    setToken(responseToken?.data);
    axiosBackInstance.defaults.headers.Authorization = `Token ${responseToken.data.token}`;
    setUser(responseUser.data[0]);
    setSigned(true);
  }

  return (
    <AuthContext.Provider value={{ user, signed, Login }}>
      {children}
    </AuthContext.Provider>
  );
};
