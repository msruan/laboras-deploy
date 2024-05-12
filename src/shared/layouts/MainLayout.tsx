import { GetProfileByEmail } from "@/actions/ProfileAction";
import { LoggedUserContext } from "@/context/LoggedUserContext";
import { AsideFollowers } from "@/shared/components/AsideFollowers";
import { AsideMyProfile } from "@/shared/components/AsideMyProfile";
import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export const MainLayout = () => {
  const email = sessionStorage.getItem("email");
  const { profile, handleChange } = useContext(LoggedUserContext);
  if (email && !profile) {
    const { response: data, isSuccess } = GetProfileByEmail(email);
    if (isSuccess) {
      handleChange({ username: data?.username, id: data?.id });
    }
  }

  return (
    <>
      {email && (
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
