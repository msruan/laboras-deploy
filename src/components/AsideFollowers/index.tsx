import { Profile } from "../Profile/index";
import { IProfile } from "../../models/profile";
import { IFollowing } from "../../models/following";
import style from "./AsideFollowers.module.css";
import { useEffect, useState } from "react";

interface AsideFollowersProps {
  idLoggedUser: string;
}

export function AsideFollowers({ idLoggedUser}: AsideFollowersProps) {
  const [followers, setFollowers] = useState<IProfile[]>([]);

  async function auxSetFollowers(userId: string){

    const userFollowers = await getFollowers(idLoggedUser);
    console.log("Oxi, chamei auxSetFollowers com isso aqui de dados ",userFollowers)

    setFollowers(userFollowers);
  }

  useEffect(() => {
    console.log("Oxi, montei")
    auxSetFollowers(idLoggedUser);
  }, []);

  return (
    <div>
      <h2 className={style.title}>Your followers</h2>
      <ul>
        {followers.map((profile)=><Profile perfil={profile}/>)}
      </ul>
    </div>
  );
}

async function getFollowersId(userId: string) : Promise<string[]> {
  const response = await fetch("http://localhost:3000/following");
  const jsonFollowers: IFollowing[] = await response.json();
  console.log(jsonFollowers);
  const idFollowers : string[]= [];
  jsonFollowers.forEach((following) => {
    if (following.from_user_id === userId) {
      idFollowers.push(following.to_user_id);
    }
  });
  console.log("Tenho ",jsonFollowers.length,' ids');
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