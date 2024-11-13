import { Link, useLocation } from "react-router-dom";
import { ProfileTag } from "./profile/ProfileTag";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
  CogIcon as CogIconFilled,
  HomeIcon as HomeIconFilled,
  UserCircleIcon as UserCircleIconFilled,
} from "@heroicons/react/16/solid";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Footer() {
  const { user: perfil, signed } = useAuth();
  const local = useLocation();
  const localIsHome = local.pathname === "/";
  const localIsUser = local.pathname === `/users/${perfil?.username}`;
  const localIsConfig = local.pathname === "/config";
  return (
    <>
      {signed && (
        <div className="fixed bottom-0 flex items-center justify-between w-full p-4 text-5xl bg-black md:hidden">
          {localIsHome ? (
            <Link to="/">
              <HomeIconFilled className="w-8 h-8 text-biancapurple" />
            </Link>
          ) : (
            <Link to="/">
              <HomeIcon className="w-8 h-8 text-biancapurple" />
            </Link>
          )}

          {localIsUser ? (
            <Link to={`/users/${perfil?.username}`}>
              <UserCircleIconFilled className="w-8 h-8 text-biancapurple" />{" "}
            </Link>
          ) : (
            <Link to={`/users/${perfil?.username}`}>
              <UserCircleIcon className="w-8 h-8 text-biancapurple" />{" "}
            </Link>
          )}

          {localIsConfig ? (
            <Link to="/config">
              <CogIconFilled className="w-8 h-8 text-biancapurple" />{" "}
            </Link>
          ) : (
            <Link to="/config">
              <CogIcon className="w-8 h-8 text-biancapurple" />{" "}
            </Link>
          )}

          <Link to={`/users/${perfil?.username}`}>
            <Avatar className="w-8 h-8 rounded-full cursor-pointer">
              <AvatarImage
                src={perfil?.avatar ?? "src/assets/chorro-timido.JPG"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      )}
    </>
  );
}
