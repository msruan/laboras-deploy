import { MainPosts } from "./components/MainPosts";
import { AsideMyProfile } from "./components/AsideMyProfile";
import { AsideFollowers } from "./components/AsideFollowers";
import { IProfile } from "./models/profile";
import style from "./App.module.css";

interface AppProps {
  idLoggedUser: string;
}

export function App({ idLoggedUser }: AppProps) {
  return (
    <div className="row">
      <header className="row"> {/*className={style.header}*/}
        <h1>LABORAS</h1>
      </header>
      <main>
        <div className="row">
          <aside className={`col-md-3 ${style.box} ${style.AsideMyProfile} `} > {/*className={style.aside}*/}
            <AsideMyProfile idLoggedUser={idLoggedUser} />
          </aside>
          <main className={`col-md-6 ${style.box} ${style.main}`}> {/*className={style.main}*/}
            <MainPosts idLoggedUser={idLoggedUser} />
          </main>
          <aside className={`col-md-3 ${style.box} ${style.AsideFollowers}`}> {/*className={style.aside}*/}
            <AsideFollowers idLoggedUser={"1"} />
          </aside>
        </div>
      </main>
    </div>
  );
}
