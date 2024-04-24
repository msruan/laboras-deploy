import { AsideFollowers } from "@/components/AsideFollowers";
import { AsideMyProfile } from "@/components/AsideMyProfile";
import { MainPosts } from "@/components/MainPosts";

interface AppProps {
  idLoggedUser: string;
}

export function App({ idLoggedUser }: AppProps) {
  return (
    <div>
      <AsideMyProfile idLoggedUser={idLoggedUser} />
      <MainPosts idLoggedUser={idLoggedUser} />
      <AsideFollowers idLoggedUser={"1"} />
    </div>
  );
}
