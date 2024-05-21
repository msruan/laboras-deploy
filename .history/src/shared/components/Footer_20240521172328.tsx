import { Link } from "react-router-dom";
import { ProfileTag } from "./profile/ProfileTag";
import { Button } from "@mui/material";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/context/AuthContext";

export function Footer() {
  const { user: perfil, signed } = useAuth();
  return (
    <>
      {signed && (
        <div className="fixed bottom-0 flex items-center justify-between w-full p-5 text-5xl pb-7 m">
          <Link to="/posts">
            <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
              <HomeIcon className="w-8 h-8 mr-1 text-biancapurple" />
            </Button>
          </Link>

          <Link to={`/posts/profile/${perfil?.username}`}>
            <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
              <UserCircleIcon className="w-8 h-8 mr-1 text-biancapurple" />{" "}
            </Button>
          </Link>

          <Link to="/config">
            <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
              <CogIcon className="w-8 h-8 mr-1 text-biancapurple" />{" "}
            </Button>
          </Link>
          <ProfileTag perfil={perfil!} />
        </div>
      )}
    </>
  );
}
