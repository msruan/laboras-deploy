import {
  Card,
  CardTitle,
  CardContent,
} from "./../../shared/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { useEffect } from "react";
import { useParams } from "react-router";
import { IProfile } from "../models/profile";

type IProfileProps = {
  profile: IProfile;
};

export const Profile = ({ profile }: IProfileProps) => {
  return (
    <Card className="flex flex-row items-center gap-16 p-9 px-20 rounded-none bg-transparent border-r-0 border-l-0 border-rebeccapurple2">
      <div className="flex flex-col h-full items-center justify-center gap-5">
        <Avatar className="h-56 w-56">
          <AvatarImage
            src={
              profile.profile_image_link ??
              "https://i.pinimg.com/originals/b5/81/61/b58161c8a74b05c68eeefae22908ce35.jpg"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button className="w-16 text-white rounded-full font-bold px-9">
          Seguir
        </Button>
      </div>

      <div className="flex flex-col w-full gap-3 items-center">
        <CardTitle className="text-2xl font-bold tracking-tighter">
          {profile ? (
            <p>
              {profile.first_name} {profile.last_name}
              {/* {profile.username} */}
            </p>
          ) : (
            <p>Nada n</p>
          )}
        </CardTitle>

        <CardContent className="flex flex-col gap-6 p-0 items-center">
          <div className="flex flex-row w-full gap-10 p-0 justify-center">
            <p>
              300 <strong>publicações</strong>
            </p>
            <p>
              500 <strong>seguimores</strong>
            </p>
            <p>
              400 <strong>seguindo</strong>
            </p>
          </div>

          <div className="flex w-fit h-fit text-wrap ">
            <p className="break-normal text-ellipsis ">
              {profile.bio ?? (
                <p>
                  Meiga e abusada, faço você se perder! e quem foi que disse que
                  eu estava apaixonada por você? eu só quero saber! linda e
                  perfumada, ah, na tua mente! faz o que quiser comigo na
                  imaginação. homem do teu tipo eu uso mas se chega lá, eu digo
                  não...
                </p>
              )}
            </p>
          </div>

          <Button className="font-bold p-4 px-9 w-16 h-8 bg-slate-700 hover:bg-slate-800 text-white rounded-full justify-self-center">
            Editar
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
