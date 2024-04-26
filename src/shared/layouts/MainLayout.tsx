import { AsideFollowers } from "@/components/AsideFollowers";
import { AsideMyProfile } from "@/components/AsideMyProfile";
import { Link, Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    
      <div className="min-h-screen w-full">
        <AsideMyProfile className="fixed w-72 min-h-screen top-0 left-0 z-1 overflow-x-hidden" idLoggedUser={"1"} />
        <main className="ml-72 mr-72">
          <Outlet />
        </main>
        <AsideFollowers className="fixed w-72 min-h-screen right-0 top-0 z-1 overflow-x-hidden"  idLoggedUser={"1"} />
      </div>
  
  );
};

export default MainLayout;
