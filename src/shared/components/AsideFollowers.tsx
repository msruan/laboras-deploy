import { ProfileTag } from "./ProfileTag";
import { IProfile } from "../models/profile";
import { IFollowing } from "../models/following";
import { useEffect, useState } from "react";
import { ScrollArea } from "./ui/scrolarea";

type AsideFollowersProps = {
  idLoggedUser: string;
  className: string;
};

export const AsideFollowers = ({
  idLoggedUser,
  className,
}: AsideFollowersProps) => {
  const [followers, setFollowers] = useState<IProfile[]>([]);

  async function auxSetFollowers(userId: string) {
    const userFollowers = await getFollowers(idLoggedUser);

    setFollowers(userFollowers);
  }

  useEffect(() => {
    auxSetFollowers(idLoggedUser);
  }, []);

  return (
    <div
      className={`flex flex-col border-l-2 items-center border-rebeccapurple2 p-6 gap-3 ${className}`}
    >
      <h2 className="text-white font-sans text-2xl font-bold">Your followers</h2>
      <ScrollArea className="flex flex-row h-lvh w-60">
        <div className="min-h-full flex flex-col gap-11">
          {followers.map((profile) => (
            <ProfileTag key={profile.id} perfil={profile} />
          ))}
          {followers.map((profile) => (
            <ProfileTag key={profile.id} perfil={profile} />
          ))}
          {followers.map((profile) => (
            <ProfileTag key={profile.id} perfil={profile} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

async function getFollowersId(userId: string): Promise<string[]> {
  const response = await fetch("http://localhost:3000/following");
  const jsonFollowers: IFollowing[] = await response.json();
  const idFollowers: string[] = [];

  jsonFollowers.forEach((following) => {
    if (following.to_user_id == userId) {
      idFollowers.push(following.from_user_id); //Todo: Que porra eh essa?
    }
  });

  // console.log("Followers: ", idFollowers);
  return idFollowers;
}

async function getProfiles(): Promise<IProfile[]> {
  const response = await fetch("http://localhost:3000/profiles");
  const profiles: IProfile[] = await response.json();
  return profiles;
}

async function getFollowers(userId: string): Promise<IProfile[]> {
  const profiles = await getProfiles();
  const followersId = await getFollowersId(userId);
  return profiles.filter((profile) => followersId.includes(profile.id)); //Todo: isso não é eficiente
}
