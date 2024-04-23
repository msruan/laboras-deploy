import { Link, Outlet } from "react-router-dom";

export const LoginLayout = () => {
  return (
    <>
      <header>
        <h1>LABORAS OUTSIDE</h1>
        <Link to="/login">LOGIN</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <h1>ACABA AQUI</h1>
      </footer>
    </>
  );
};

export default LoginLayout