import { Card, CardTitle, CardContent } from "../ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { ProfileDetailed } from "../../models/profile";
import { useAuth } from "@/context/AuthContext";
import { FollowProfile } from "@/actions/ProfileAction";
import { useToken } from "@/shared/hooks/useToken";

type Props = {
  profile: ProfileDetailed;
};

export const Profile = ({ profile }: Props) => {
  const { signed, user } = useAuth();
  const { token } = useToken();
  const isCurrentUserProfile = signed
    ? user?.username === profile.username
    : false;
  const teste = { id_user: profile.uid, token: token() as string };
  // const { response} = FollowProfile(teste);
  // console.log("??",response)

  const handleFollow = () => {};
  return (
    <Card className="flex max-sm:hidden flex-row items-center gap-16 p-9 px-20 rounded-none bg-transparent border-r-0 border-l-0 border-rebeccapurple2">
      <div className="flex flex-col h-full items-center justify-center gap-5">
        <Avatar className="h-56 w-56 max-xl:h-40 max-xl:w-40 max-sm:h-20 max-sm:w-20">
          <AvatarImage
            src={
              profile?.avatar_link ??
              "https://i.pinimg.com/originals/b5/81/61/b58161c8a74b05c68eeefae22908ce35.jpg"
            }
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {signed && isCurrentUserProfile && (
          <Button className="w-32 text-white rounded-full font-bold px-9">
            Change image
          </Button>
        )}
        {!isCurrentUserProfile && (
          <Button
            className="w-32 text-white rounded-full font-bold px-9"
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
      </div>

      <div className="flex flex-col w-full gap-3 items-center">
        <CardTitle className="text-2xl font-bold tracking-tighter">
          {profile ? <p>{profile.full_name}</p> : <p>Nada n</p>}
        </CardTitle>

        <CardContent className="flex flex-col gap-6 p-0 items-center">
          <div className="flex flex-row w-full gap-10 p-0 justify-center">
            <p>
              300 <strong>publicações</strong>
            </p>
          </div>

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
      </div>
    </Card>
  );
};
