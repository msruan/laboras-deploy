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
        <div className="w-full min-h-screen">
          <AsideMyProfile className="fixed top-0 left-0 min-h-screen overflow-x-hidden w-72 z-1" />
          <main className="ml-72 mr-72">
            <Outlet />
          </main>
          <AsideFollowers className="fixed top-0 right-0 min-h-screen overflow-x-hidden w-72 z-1" />
          <Footer></Footer>
        </div>
      )}
    </>
  );
};

export default MainLayout;
