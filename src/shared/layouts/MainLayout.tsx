import { useAuth } from "@/context/AuthContext";
import { AsideFollowers } from "@/shared/components/AsideFollowers";
import { AsideMyProfile } from "@/shared/components/AsideMyProfile";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import Middleware from "@/middleware";

export const MainLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Middleware />
      {user && (
        <div className=" w-full min-h-screen">
          <AsideMyProfile />
          <main className="ml-96 max-xl:ml-24 xl:mr-96 max-md:m-0 max-sm:mb-16">
            <Outlet />
          </main>
          <AsideFollowers />
          <Footer />
        </div>
      )}
    </>
  );
};

export default MainLayout;
