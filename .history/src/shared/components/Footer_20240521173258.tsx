import { Link } from "react-router-dom";
import { ProfileTag } from "./profile/ProfileTag";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Footer() {
  const { user: perfil, signed } = useAuth();
  return (
    <>
      {signed && (
        <div className="fixed bottom-0 flex items-center justify-between w-full p-5 text-5xl bg-black md:hidden">
          <Link to="/posts">
            <HomeIcon className="w-8 h-8 text-biancapurple" />
          </Link>

          <Link to={`/posts/profile/${perfil?.username}`}>
            <UserCircleIcon className="w-8 h-8 text-biancapurple" />{" "}
          </Link>

          <Link to="/config">
            <CogIcon className="w-8 h-8 text-biancapurple" />{" "}
          </Link>
          <Avatar className="w-8 h-8 rounded-full cursor-pointer">
            <AvatarImage
              src={perfil?.profile_image_link ?? "src/assets/chorro-timido.JPG"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
    </>
  );
}
