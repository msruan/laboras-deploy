import { Profile } from "../Profile/index";
import {IProfile} from '../../models/profile'
import style from "./AsideProfile.module.css";
import { useEffect, useState } from "react";

interface AsideMyProfileProps {
  idLoggedUser : string;
}

async function getPerfil(idPerfil: string) : Promise<IProfile>{
  const response = await fetch(`http://localhost:3000/profiles/${idPerfil}`);
  const jsonPerfil : IProfile = await response.json();
  return jsonPerfil;
}



export function AsideMyProfile({idLoggedUser} : AsideMyProfileProps) {

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
    <div className={style.main_container}>
      <div>
        <div className={style.opcao}>
          <i>ICON EM BREVE</i>
          <h3>Acesse o perfil</h3>
        </div>
      </div>
      <Profile perfil={perfil}/>
    </div>
  );
}
