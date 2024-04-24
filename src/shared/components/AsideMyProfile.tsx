import { Profile } from "./Profile";
import { IProfile } from "../models/profile";
import { useEffect, useState } from "react";
import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type AsideMyProfileProps = {
  idLoggedUser: string;
};

async function getPerfil(idPerfil: string): Promise<IProfile> {
  const response = await fetch(`http://localhost:3000/profiles/${idPerfil}`);
  const jsonPerfil: IProfile = await response.json();
  return jsonPerfil;
}

export const AsideMyProfile = ({ idLoggedUser }: AsideMyProfileProps) => {
  const defaultPerfil: IProfile = {
    id: "2",
    name: "Ruan Macedo",
    username: "msruan",
  };

  const [perfil, setPerfil] = useState(defaultPerfil);

  async function auxSetPerfil() {
    setPerfil(await getPerfil(idLoggedUser));
  }

  useEffect(() => {
    auxSetPerfil();
  }, []);

  return (
    <div className="flex flex-col w-fit min-h-screen p-6 justify-between">
      <style>
        {`
                h2 {
                  font-family: 'Habbo', sans-serif;
                  font-size: 50px;
                  text-shadow: 2px 2px 15px rebeccapurple
                }
              `}
      </style>

      <div className="flex flex-col w-full gap-4">
        <h2>LABORAS</h2>
        <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
          <HomeIcon className="mr-1 h-9 w-9" />
          Home
        </Button>

        <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
          <AvatarIcon className="mr-1 h-10 w-10" /> Profile
        </Button>
      </div>

      <Profile perfil={perfil} />
    </div>
  );
};
