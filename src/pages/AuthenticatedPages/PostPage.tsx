import { useEffect } from "react";
import { AsideFollowers } from "../../shared/components/AsideFollowers";
import { AsideMyProfile } from "../../shared/components/AsideMyProfile";
import { Container } from "../../shared/components/Container";
import { MainPosts } from "../../shared/components/MainPosts";

export const PostPage = () => {
  let idLoggedUser = "";

  useEffect(() => {
    idLoggedUser = sessionStorage.getItem("idLoggedUser") ?? "";
  }, []);

  return (
    <>
      <Container>
        <aside className="grid grid-rows grid-row-start-2 grid-row-end-3">
          <AsideMyProfile idLoggedUser={idLoggedUser} />
        </aside>
        <main className="grid grid-rows col-span-1 row-span-1">
          <MainPosts idLoggedUser={idLoggedUser} />
        </main>
        <aside className="grid grid-rows grid-row-start-2 grid-row-end-3">
          <AsideFollowers idLoggedUser={"1"} />
        </aside>
      </Container>
    </>
  );
};
