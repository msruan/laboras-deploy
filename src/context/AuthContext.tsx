import axiosInstance from "@/config/axiosConfig";
import { useToken } from "@/shared/hooks/useToken";
import { ProfileDetailed } from "@/shared/models/profile";
import { AxiosResponse } from "axios";
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
  username: string;
  password: string;
};

export type LoggedUserContextType = {
  user: ProfileDetailed | null;
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
  const [user, setUser] = useState<ProfileDetailed | null>(null);

  const { token } = useToken();

  useEffect(() => {
    if (!signed && token() !== null) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${token()}`;
      console.log(token());
      getLoggedUser(token()!);
    } else {
      console.log("ainda nao baby");
    }
  }, []);

  async function Login(credentials: CredentialsLogin) {
    const { setToken } = useToken();

    const loginRequest: AxiosResponse<{ acess_token: string }> =
      await axiosInstance.post("/auth/login", credentials);

    const token = loginRequest?.data.acess_token;
    setToken(token);

    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
    getLoggedUser(token);

    setSigned(true);
  }

  function getLoggedUser(token: string): void {
    axiosInstance
      .get(`/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
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
