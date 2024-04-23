import { Link, Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <header>
        <h1>LABORAS INSIDE</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h1>FIM DA PAGINA</h1>
      </footer>
    </>
  );
};

export default MainLayout