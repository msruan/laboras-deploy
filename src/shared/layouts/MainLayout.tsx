import { GetProfileByEmail } from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";
import { AsideFollowers } from "@/shared/components/AsideFollowers";
import { AsideMyProfile } from "@/shared/components/AsideMyProfile";
import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { Footer } from "../components/Footer";

export const MainLayout = () => {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div className=" w-full min-h-screen">
          <AsideMyProfile />
          <main className="ml-72 max-xl:ml-24 xl:mr-72 max-md:m-0 max-sm:mb-16">
            <Outlet />
          </main>
          <AsideFollowers />
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default MainLayout;
