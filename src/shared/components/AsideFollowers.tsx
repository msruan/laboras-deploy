import { useParams } from "react-router";
import { ProfileTag } from "./ProfileTag";
import { ScrollArea } from "./ui/scrolarea";
import {
  GetProfileByUsername,
  GetProfileFollowers,
  GetProfileById,
} from "@/actions/ProfileAction";
import { LoggedUserContext } from "@/context/LoggedUserContext";
import { useContext } from "react";
import { IProfile } from "../models/profile";

type AsideFollowersProps = {
  className: string;
};

const initializer: IProfile = {
  id: "1",
  username: "biancabzra",
  first_name: "Bianca",
  last_name: "Bezerra",
  email: "bia@gmail.com",
  password: "1234",
  bio: "anyway nihao",
  profile_image_link:
    "https://i.pinimg.com/564x/32/e9/1e/32e91e1a803722a0dab201feddf78070.jpg",
};

export const AsideFollowers = ({ className }: AsideFollowersProps) => {
  const { response: followers, isSuccess, isLoading } = GetProfileFollowers();
  const { profile: context } = useContext(LoggedUserContext);
  const userId = context?.id ?? "";
  const { username } = useParams();
  let profile;
  let isTheLoggedUser = true;
  if (username !== undefined) {
    isTheLoggedUser = username == context?.username;
    const { response } = GetProfileByUsername(username);
    profile = response;
  } else {
    const { response } = GetProfileById(userId); //@Todo: por que diabos não consigo tirar isso?
    profile = response;
  }

  return (
    <>
      {profile ? (
        <div
          className={`flex flex-col border-l-2 items-center border-rebeccapurple2 p-6 gap-3 ${className}`}
        >
          {isLoading && <h2>Pending...</h2>}
          {isSuccess && (
            <>
              <h2 className="text-white font-sans text-2xl font-bold">
                {isTheLoggedUser ? "Your " : `${profile.first_name}'s `}
                followers
              </h2>
              <ScrollArea className="flex flex-row h-lvh w-60">
                <div className="min-h-full flex flex-col gap-11">
                  {followers!.map((profile) => (
                    <ProfileTag key={profile.id} perfil={profile} />
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </div>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
};
