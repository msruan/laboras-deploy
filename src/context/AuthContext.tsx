import { Login } from "@/actions/AuthAction";
import { GetProfileByEmail } from "@/actions/ProfileAction";
import axiosInstance, {
  axiosBackInstance,
  axiosNextInstance,
} from "@/config/axiosConfig";
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
    console.log(user);
  }, []);

  async function Login(credentials: CredentialsLogin) {
    const { setToken } = useToken();
    const { setEmail } = useEmail();
    const user: AxiosResponse<IProfile> = await axiosNextInstance.post(
      "/auth/login",
      credentials
    );
    setToken(user?.data.token);
    axiosBackInstance.defaults.headers.Authorization = `Token ${user.data.token}`;
    setEmail(user.data.email);
    setUser(user.data);
    setSigned(true);
  }

  function getLoggedUser(token: string): void {
    axiosNextInstance
      .get(`/user/me`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setSigned(true);
      });
  }

  return (
    <AuthContext.Provider value={{ user, signed, setSigned, Login }}>
      {children}
    </AuthContext.Provider>
  );
};
