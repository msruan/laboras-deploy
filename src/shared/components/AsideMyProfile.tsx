import { ProfileTag } from "./ProfileTag";
import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { GetProfileById } from "@/actions/ProfileAction";
import { CogIcon } from "@heroicons/react/16/solid";
import { useContext } from "react";
import { LoggedUserContext } from "@/context/LoggedUserContext";

type AsideMyProfileProps = {
  className: string;
};

export const AsideMyProfile = ({ className }: AsideMyProfileProps) => {
  const { profile: context } = useContext(LoggedUserContext);
  const idLoggedUser = context?.id;
  const { response: perfil, isSuccess } = GetProfileById(idLoggedUser ?? "");

  return (
    <div
      className={`flex flex-col  border-r-2 border-rebeccapurple2 p-5 justify-between ${className}`}
    >
      {isSuccess && (
        <>
          <style>
            {`
                h2 {
                  font-family: 'Habbo', sans-serif;
                  text-shadow: 2px 2px 15px rebeccapurple
                }
              `}
          </style>

          <div className="flex flex-col text-5xl w-full gap-4 p-2">
            <h2 className="">LABORAS</h2>

            <Link to="/posts">
              <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
                <HomeIcon className="mr-1 h-9 w-9" />
                Home
              </Button>
            </Link>

            <Link to={`/posts/profile/${perfil?.username}`}>
              <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
                <AvatarIcon className="mr-1 h-10 w-10" /> Profile
              </Button>
            </Link>

            <Link to="/config">
              <Button className="flex items-center justify-start w-full h-fit p-1 pl-3 pr-7 gap-4 rounded-full bg-transparent hover:bg-rebeccapurple text-white font-bold text-lg transition-all duration-200">
                <CogIcon className="mr-1 h-10 w-10" /> Settings
              </Button>
            </Link>
          </div>

          <ProfileTag perfil={perfil!} />
        </>
      )}
    </div>
  );
};
