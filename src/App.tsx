import { AsideFollowers } from "@/components/AsideFollowers";
import { AsideMyProfile } from "@/components/AsideMyProfile";
import { MainPosts } from "@/components/MainPosts";

interface AppProps {
  idLoggedUser: string;
}

export function App({ idLoggedUser }: AppProps) {
  return (
    <div>
      <AsideMyProfile  idLoggedUser={idLoggedUser} />
      <main>
        <MainPosts idLoggedUser={idLoggedUser} />
      </main>
      <AsideFollowers idLoggedUser={"1"} />
    </div>
  );
}
