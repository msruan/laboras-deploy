import { useState } from "react";
import { Card, CardTitle, CardContent } from "../ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { ProfileDetailed } from "../../models/profile";
import { useAuth } from "@/context/AuthContext";
import {
  FollowProfile,
  UnfollowProfile,
  UpdateProfile,
} from "@/actions/ProfileAction";
import { useToken } from "@/shared/hooks/useToken";
import { Link } from "react-router-dom";

type Props = {
  profile: ProfileDetailed;
};

export const Profile = ({ profile }: Props) => {
  const { signed, user } = useAuth();
  const { token } = useToken();

  const isCurrentUserProfile = signed
    ? user?.username === profile.username
    : false;

  const profileToBeFollowed = {
    id_user: profile.uid as string,
    token: token() as string,
    username: profile.username as string,
  };

  const { mutate: followMutate } = FollowProfile(profileToBeFollowed);
  const { mutate: unfollowMutate } = UnfollowProfile(profileToBeFollowed);
  const { mutate: changeBio } = UpdateProfile();

  const isFollowing = user?.following.some((user) => user.uid === profile.uid);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(profile?.bio || "");

  function handleFollow() {
    if (isFollowing) {
      unfollowMutate();
    } else {
      followMutate();
    }
  }

  function handleUpdateBio() {
    const bioUpdated = {
      userId: user!.uid,
      bio: bio,
    };

    changeBio(bioUpdated);

    //to=do implementar com a rota de put
    setIsEditingBio(false);
  }

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
          <Link to="/config">
            <Button className="w-32 text-white rounded-full font-bold px-9">
              Mudar
            </Button>
          </Link>
        )}
        {!isCurrentUserProfile && (
          <Button
            className={`w-32 text-white rounded-full font-bold px-9 ${
              isFollowing ? "bg-pink-900 hover:bg-pink-950" : ""
            }`}
            onClick={handleFollow}
          >
            {isFollowing ? "Deixar de seguir" : "Seguir"}
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
              {profile.posts.length} <strong>publicações</strong>
            </p>
          </div>

          <div className="flex w-fit h-fit text-wrap ">
            {isEditingBio ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="border bg-black text-white border-gray-300 rounded p-2"
                rows={4}
                placeholder="Digite sua nova bio aqui..."
              />
            ) : (
              <p className="break-normal text-ellipsis">
                {profile.bio !== "" ? (
                  profile.bio
                ) : (
                  <p>
                    Meiga e abusada, faço você se perder! e quem foi que disse
                    que eu estava apaixonada por você? eu só quero saber! linda
                    e perfumada, ah, na tua mente! faz o que quiser comigo na
                    imaginação. homem do teu tipo eu uso mas se chega lá, eu
                    digo não...
                  </p>
                )}
              </p>
            )}
          </div>

          {!isEditingBio && (
            <Button
              className="font-bold p-4 px-9 w-16 h-8 bg-slate-700 hover:bg-slate-800 text-white rounded-full justify-self-center"
              onClick={() => setIsEditingBio(true)}
            >
              Editar bio
            </Button>
          )}

          {isEditingBio && (
            <div className="flex gap-4">
              <Button
                className="font-bold p-4 px-9 w-16 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-full justify-self-center"
                onClick={() => setIsEditingBio(false)}
              >
                Cancelar
              </Button>

              <Button
                className="font-bold p-4 px-9 w-16 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full justify-self-center"
                onClick={handleUpdateBio}
              >
                Salvar
              </Button>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
