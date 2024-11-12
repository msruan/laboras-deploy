import { Card, CardTitle, CardContent } from "../ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { ProfileDetailed } from "../../models/profile";
import { useAuth } from "@/context/AuthContext";

type IProfileProps = {
  profile: ProfileDetailed;
};

export const ProfileMobile = ({ profile }: IProfileProps) => {
  const { signed, user } = useAuth();
  const isCurrentUserProfile = signed
    ? user?.username === profile.username
    : false;
  return (
    <Card className="flex sm:hidden flex-col items-center gap-7 pt-20 pb-10 rounded-none bg-transparent border-r-0 border-l-0 border-rebeccapurple2 ">
      <div
        className="flex items-start justify-center gap-8
       w-full"
      >
        <div className="flex flex-col h-full items-center justify-center gap-3">
          <Avatar className="h-56 w-56 max-xl:h-40 max-xl:w-40 max-sm:h-20 max-sm:w-20">
            <AvatarImage
              src={
                profile?.avatar ??
                "https://i.pinimg.com/originals/b5/81/61/b58161c8a74b05c68eeefae22908ce35.jpg"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {signed && isCurrentUserProfile && (
            <Button className="w-6   text-white rounded-full font-bold text-sm px-8">
              Change
            </Button>
          )}
        </div>
        <div className="flex flex-col items-start gap-4">
          <CardTitle className="text-2xl font-bold tracking-tighter">
            {profile ? (
              <>
                <p>{profile.full_name}</p>
                <p className="text-gray-400 font-normal">{profile.username}</p>
              </>
            ) : (
              <p>Nada n</p>
            )}
          </CardTitle>
          <div className="flex justify-center items-center">
            <div className="flex font-normal text-md flex-row gap-10 p-0 justify-center">
              <p>
                300 <strong>publicações</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-6 p-0 items-center w-full">
        <div className="flex w-fit h-fit text-wrap ">
          <p className="break-normal text-ellipsis ">
            {profile?.bio ?? (
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
        {signed && isCurrentUserProfile && (
          <Button className="font-bold p-4 px-9 w-16 h-8 bg-slate-700 hover:bg-slate-800 text-white rounded-full justify-self-center">
            Edit bio
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
