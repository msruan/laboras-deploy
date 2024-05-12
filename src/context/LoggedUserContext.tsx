import { useState, createContext, ReactNode } from "react";


const initializer : LoggedUserContextType= {
  profile: undefined,
  handleChange: ({ username, id }: LoggedUserInfo) => {}
} 
export const LoggedUserContext = createContext<LoggedUserContextType>(initializer);

type LoggedUserInfo = {
  username?: string;
  id?: string;
};

export type LoggedUserContextType = {
  profile: LoggedUserInfo | undefined
  handleChange: ({ username, id }: LoggedUserInfo) => void;
};

export const LoggedUserProvider = ({ children }: { children: ReactNode }) => {

  const [profile, setProfile] = useState<LoggedUserInfo>();

  const handleChange = ({ username, id }: LoggedUserInfo) => {
    setProfile((oldProfile) => {
      let copy : LoggedUserInfo = {...oldProfile};
      copy.username = username ?? copy.username;
      copy.id = id ?? copy.id
      return copy;
    });
  };

  return (
    <LoggedUserContext.Provider value={{ profile, handleChange }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
