import { GetProfileByEmail } from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";
import { AsideFollowers } from "@/shared/components/AsideFollowers";
import { AsideMyProfile } from "@/shared/components/AsideMyProfile";
import { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useToken } from "../hooks/useToken";

export const MainLayout = () => {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div className="min-h-screen w-full">
          <AsideMyProfile className="fixed w-72 min-h-screen top-0 left-0 z-1 overflow-x-hidden" />
          <main className="ml-72 mr-72">
            <Outlet />
          </main>
          <AsideFollowers className="fixed w-72 min-h-screen right-0 top-0 z-1 overflow-x-hidden" />
        </div>
      )}
    </>
  );
};

export default MainLayout;
