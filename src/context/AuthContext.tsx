import { Login } from "@/actions/AuthAction";
import { axiosNextInstance } from "@/config/axiosConfig";
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
      console.log("mano tentei logar: ", token());
      getLoggedUser(token()!);
    } else {
      console.log("sem token ou signado já");
    }
  }, []);

  async function Login(credentials: CredentialsLogin) {
    console.log("mano eu salvei essa dsg");
    const { setToken } = useToken();
    const user: AxiosResponse<IProfile> = await axiosNextInstance.post(
      "/auth/login",
      credentials
    );
    console.log("fiz a porra do login com o back");
    console.log("o token que recebi do back foi: ", user?.data.token);
    setToken(user?.data.token);
    axiosNextInstance.defaults.headers.Authorization = `Token ${user.data.token}`;
    setUser(user.data);
    setSigned(true);
  }

  function getLoggedUser(token: string): void {
    axiosNextInstance
      .get(`/profiles/me`, {
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
