import { useParams } from "react-router";
import { ProfileTag } from "./profile/ProfileTag";
import { ScrollArea } from "./ui/scrolarea";
import {
  GetProfileByUsername,
  GetProfileFollowers,
  GetProfileById,
} from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";

import { IProfile } from "../models/profile";
import { UserGroupIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type AsideFollowersProps = {
  className: string;
};

export const AsideFollowers = ({ className }: AsideFollowersProps) => {
  const { response: followers, isSuccess, isLoading } = GetProfileFollowers();
  const { user: context, signed } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      {signed ? (
        <>
          <div className={`flex flex-col items-center p-6 gap-3 ${className}`}>
            {isLoading && <h2>Pending...</h2>}
            {isSuccess && (
              <>
                <XCircleIcon className="w-4 h-4 absolute left-6"></XCircleIcon>

                <h2 className="text-white font-sans text-2xl font-bold">
                  {/* {isTheLoggedUser ? "Your " : `${profile?.first_name}'s `}
                followers */}
                  People signed
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
          {/* <UserGroupIcon className="w-4 h-4"></UserGroupIcon>
          <div className={`flex flex-col items-center p-6 gap-3 ${className}`}>
            {isLoading && <h2>Pending...</h2>}
            {isSuccess && (
              <>
                <h2 className="text-white font-sans text-2xl font-bold">
                
                  People signed
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
          </div> */}
        </>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
};
