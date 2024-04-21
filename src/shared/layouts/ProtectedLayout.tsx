import { Outlet } from "react-router-dom";

export const ProtectedLayout = () => {
  sessionStorage.setItem("idLoggedUser", "1");

  return (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
