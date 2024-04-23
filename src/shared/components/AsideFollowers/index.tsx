import { Profile } from "../Profile/index";
import { IProfile } from "../../models/profile";
import { IFollowing } from "../../models/following";
import style from "./AsideFollowers.module.css";
import { useEffect, useState } from "react";

type AsideFollowersProps = {
  idLoggedUser: string;
}

export const AsideFollowers = ({ idLoggedUser}: AsideFollowersProps) => {
  const [followers, setFollowers] = useState<IProfile[]>([]);

  async function auxSetFollowers(userId: string){

    const userFollowers = await getFollowers(idLoggedUser);

    setFollowers(userFollowers);
  }

  useEffect(() => {
    auxSetFollowers(idLoggedUser);
  }, []);

  return (
    <div className={style.followtab}>
      <h2 className={style.title}>Your followers</h2>
      <ul>
        {followers.map((profile)=><Profile key={profile.id} perfil={profile}/>)}
      </ul>
    </div>
  );
}

async function getFollowersId(userId: string) : Promise<string[]> {
  const response = await fetch("http://localhost:3000/following");
  const jsonFollowers: IFollowing[] = await response.json();
  const idFollowers : string[]= [];

  jsonFollowers.forEach((following) => {
    if (following.to_user_id == userId) {
      idFollowers.push(following.from_user_id);//Todo: Que porra eh essa?
    }
  });

 console.log('Followers: ',idFollowers)
  return idFollowers;
}

async function getProfiles() : Promise<IProfile[]> {
  const response = await fetch("http://localhost:3000/profiles");
  const profiles : IProfile[] = await response.json();
  return profiles;
}

async function getFollowers(userId: string) : Promise<IProfile[]> {
  const profiles = await getProfiles();
  const followersId = await getFollowersId(userId);
  return profiles.filter((profile)=>followersId.includes(profile.id));//Todo: isso não é eficiente
}