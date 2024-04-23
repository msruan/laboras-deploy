import { Profile } from "../Profile/index";
import {IProfile} from '../../models/profile'
import styles from "./AsideProfile.module.css";
import { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

type AsideMyProfileProps = {
  idLoggedUser : string;
}

async function getPerfil(idPerfil: string) : Promise<IProfile>{
  const response = await fetch(`http://localhost:3000/profiles/${idPerfil}`);
  const jsonPerfil : IProfile = await response.json();
  return jsonPerfil;
}


export const AsideMyProfile = ({idLoggedUser} : AsideMyProfileProps) => {

  const defaultPerfil : IProfile = {
    id: '2',
    name: 'Ruan Macedo',
    username: 'msruan'
  }

  const [perfil, setPerfil] = useState(defaultPerfil);


  async function auxSetPerfil(){
    setPerfil(await getPerfil(idLoggedUser));
  }


  useEffect(()=>{auxSetPerfil()},[]);

  return (
    <div className={styles.main_container}>
        <div className={styles.header}>
          <h2>LABORAS</h2>
        </div>
        <div className={styles.buttons}>
          <div className={styles.opcao}>
          <MdHome size={30}/>
            <h3>Home</h3>
          </div>
        
          <div className={styles.opcao}>
            <CgProfile size={30}/>
            <h3>Profile</h3>
          </div>
        </div>

     
      <Profile perfil={perfil}/>
    </div>
  );
}
