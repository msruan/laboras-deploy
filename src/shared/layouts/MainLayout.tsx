import { AsideFollowers } from "@/components/AsideFollowers";
import { AsideMyProfile } from "@/components/AsideMyProfile";
import useToken from "@/hooks/useToken";
import { Link, Navigate, Outlet } from "react-router-dom";
import LoginPage from './../../pages/public/LoginPage';


export const MainLayout = () => {

  const { token, setToken } = useToken();

  if(!token){
    return <LoginPage setToken={setToken} />
  }

  return (
    
      <div className="min-h-screen w-full">
        <AsideMyProfile className="fixed w-72 min-h-screen top-0 left-0 z-1 overflow-x-hidden" idLoggedUser={"1"} />
        <main className="ml-72 mr-72">
          <Out let />
        </main>
        <AsideFollowers className="fixed w-72 min-h-screen right-0 top-0 z-1 overflow-x-hidden"  idLoggedUser={"1"} />
      </div>
  
  );
};

export default MainLayout;
