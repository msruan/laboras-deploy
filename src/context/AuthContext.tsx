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
  Login(credentials: CredentialsLogin): Promise<{ ok: boolean }>;
};

const AuthContext = createContext<LoggedUserContextType>(
  {} as LoggedUserContextType
);

export const LoggedUserProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<ProfileDetailed | null>(null);

  const { token } = useToken();
  // const local = useLocation();
  // const navigate = useNavigate();
  // const isOnAuthRoutes = local.pathname === "/signup" || local.pathname === "login";

  useEffect(() => {
    if (signed) {
    } else if (token() !== null) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${token()}`;
      console.log(token());
      getLoggedUser(token()!);
      // } else if (!isOnAuthRoutes) {
      //   navigate("/login");
    }
  }, []);

  async function Login(credentials: CredentialsLogin) {
    const { setToken } = useToken();

    try {

      const loginRequest: AxiosResponse<{ acess_token: string }> =
        await axiosInstance.post("/auth/login", credentials);
      const token = loginRequest?.data.acess_token;
      setToken(token);

      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      getLoggedUser(token);

      setSigned(true);

      return { ok: true }
    }
    catch (err) {
      return { ok: false }
    }
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
