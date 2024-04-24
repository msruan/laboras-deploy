import styles from "./profile.module.css";
import { IProfile } from "../models/profile";
import { Card, CardContent } from "./ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";


type IProfileProps = {
  perfil: IProfile;
};

export const Profile = ({ perfil }: IProfileProps) => {
  return (
    // <div className="bg-purple-900 py-10 px-2 flex items-center gap-2 w-full h-auto pb-5 rounded-3xl mb-13">
    //   <img
    //     className="w-12 h-12 rounded-full"
    //     src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cc83ea9f56fe6130ce96a405"
    //     alt="foto do usuario atual"
    //   />
    //   <div className="flex flex-col">
    //     <p className="text-white">{perfil.name}</p>
    //     <p className="text-gray-500">@{perfil.username}</p>
    //   </div>
    // </div>

    <Card className="w-full bg-rebeccapurple flex gap-4 p-2 border-0">
      {/* Fotinha */}
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src="src/assets/chorro-timido.JPG" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <CardContent className="flex gap-5 break-all justify-center items-center p-0">
        <div className="flex flex-col items-start text-aliceblue text-sm gap-1.5">
          <h3>{perfil?.name}</h3>
          <h4 className="opacity-70">@{perfil?.username}</h4>
        </div>

        <i className="ml-auto pr-5">
        <DotsHorizontalIcon cursor="pointer" color="white" />
      </i>

      </CardContent>
    </Card>
  );
};
