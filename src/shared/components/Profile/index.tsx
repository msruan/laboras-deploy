import styles from "./profile.module.css";
import {IProfile} from '../../models/profile'

interface IProfileProps {
  perfil : IProfile;
}

export function Profile({perfil} : IProfileProps) {
  return (
    <div className={styles.profile_container}>
      <img
        className={styles.profile_pic}
        src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84cc83ea9f56fe6130ce96a405"
        alt="foto do usuario atual"
      />
      <div className={styles.username_container}>
        <p className={styles.name}>{perfil.name}</p>
        <p className={styles.username}>@{perfil.username}</p>
      </div>
    </div>
  );
}
