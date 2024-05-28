import { useParams } from "react-router";
import { ProfileTag } from "./profile/ProfileTag";
import { ScrollArea } from "./ui/scrolarea";
import {
  GetProfileByUsername,
  GetUsers,
  GetProfileById,
} from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";

import { IProfile } from "../models/profile";
import { UserGroupIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type AsideFollowersProps = {
  className: string;
};

export const AsideFollowers = () => {
  const { response: followers, isSuccess, isLoading } = GetUsers();
  const { user: context, signed } = useAuth();

  return (
    <>
      {signed ? (
        <>
          <div
            className={`flex flex-col items-center p-6 gap-3 fixed top-0 right-0 min-h-screen overflow-x-hidden max-xl:hidden w-72 z-1`}
          >
            {isLoading && <h2>Pending...</h2>}
            {isSuccess && (
              <>
                <h2 className="text-white font-sans text-2xl font-bold">
                  People signed
                </h2>
                <ScrollArea className="flex flex-row h-lvh w-60">
                  <div className="min-h-full flex flex-col gap-11">
                    {followers!.map((profile) => (
                      <ProfileTag key={profile._id} perfil={profile} />
                    ))}
                  </div>
                </ScrollArea>
              </>
            )}
          </div>
        </>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
};
