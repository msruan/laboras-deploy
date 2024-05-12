import { useParams } from "react-router";
import { ProfileTag } from "./ProfileTag";
import { ScrollArea } from "./ui/scrolarea";
import {
  GetProfileByUsername,
  GetProfileFollowers,
  GetUserProfile,
} from "@/actions/ProfileAction";
import { IProfile } from "../models/profile";

type AsideFollowersProps = {
  userId: string;
  className: string;
};

export const AsideFollowers = ({ className, userId }: AsideFollowersProps) => {
  const { response: followers, isSuccess, isLoading } = GetProfileFollowers();
  const { username } = useParams();
  let profile;
  let isTheLoggedUser = true;
  if (username !== undefined) {
    isTheLoggedUser = false;
    const { response } = GetProfileByUsername(username);
    profile = response;
  } else {
    const { response } = GetUserProfile(userId);
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
