import { Login } from "@/actions/AuthAction";
import { GetProfileByEmail } from "@/actions/ProfileAction";
import axiosInstance, { axiosBackInstance } from "@/config/axiosConfig";
import { useEmail } from "@/shared/hooks/useEmail";
import { useToken } from "@/shared/hooks/useToken";
import { IProfile } from "@/shared/models/profile";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

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
  setSigned: (arg: boolean) => void;
  // handleChange: ({ username, id }: LoggedUserInfo) => void;
  Login(credentials: CredentialsLogin): Promise<void>;
};

const AuthContext = createContext<LoggedUserContextType>(
  {} as LoggedUserContextType
);

export const LoggedUserProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<IProfile | null>(null);

  const { token } = useToken();

  useEffect(() => {
    if (!signed && token() !== null) {
      console.log(token());
      getLoggedUser(token()!);
    } else {
      console.log("ainda nao baby");
    }
  }, []);

  async function Login(credentials: CredentialsLogin) {
    const { setToken } = useToken();
    const responseToken: AxiosResponse<{ token: string }> =
      await axiosBackInstance.post("/auth/login/", credentials);
    setToken(responseToken?.data.token);
    axiosBackInstance.defaults.headers.Authorization = `Token ${responseToken.data.token}`;
    const { setEmail } = useEmail();
    const responseUser: AxiosResponse<IProfile[]> = await getUser(
      credentials.email
    );
    setEmail(credentials.email);
    setUser(responseUser.data[0]);
    setSigned(true);
  }

  function getLoggedUser(token: string): void {
    axiosBackInstance
      .get(`/user/me/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setSigned(true);
      });
  }

  async function getUser(email: string) {
    const responseUser: AxiosResponse<IProfile[]> = await axiosInstance.get(
      `/profiles?email=${email}`
    );
    return responseUser;
  }

  return (
    <AuthContext.Provider value={{ user, signed, setSigned, Login }}>
      {children}
    </AuthContext.Provider>
  );
};
