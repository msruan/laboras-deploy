import { Link } from "react-router-dom";
import { ProfileTag } from "./profile/ProfileTag";
import { Button } from "@mui/material";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { Separator } from "@radix-ui/react-separator";
import { useAuth } from "@/context/AuthContext";

export function Footer() {
  const { user: perfil, signed } = useAuth();
  return (
    <>
    <div className="flex flex-col justify-between h-screen text-5xl w-full p-5 pb-7 items-center">
      <div className="h-full flex flex-col gap-8 items-center">
        <div className="flex flex-col text-5xl w-full gap-4 ">
          <Link to="/posts">
            <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
              <HomeIcon className="mr-1 h-8 w-8 text-biancapurple" />
              Home
            </Button>
          </Link>

          <Link to={`/posts/profile/${perfil?.username}`}>
            <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
              <UserCircleIcon className="mr-1 h-8 w-8 text-biancapurple" />{" "}
              Profile
            </Button>
          </Link>

          <Link to="/config">
            <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
              <CogIcon className="mr-1 h-8 w-8 text-biancapurple" /> Settings
            </Button>
          </Link>
        </div>
      </div>
      <ProfileTag perfil={perfil!} />
    </div>
  );
}
