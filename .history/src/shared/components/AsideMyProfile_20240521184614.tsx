import { ProfileTag } from "./profile/ProfileTag";
// import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { GetProfileById } from "@/actions/ProfileAction";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "./ui/separator";

type AsideMyProfileProps = {
  className: string;
};

export const AsideMyProfile = ({ className }: AsideMyProfileProps) => {
  const { user: perfil, signed } = useAuth();
  const idLoggedUser = perfil?.id;
  // const { response: perfil, isSuccess } = GetProfileById(idLoggedUser ?? "");
  return (
    <div
      className={`flex flex-col   border-rebeccapurple2 p-5 justify-between ${className}`}
    >
      {signed && (
        <>
          <style>
            {`
                h2 {
                  font-family: 'Habbo', sans-serif;
                  text-shadow: 2px 2px 15px rebeccapurple
                }
              `}
          </style>

          <div className="flex flex-col items-center justify-between w-full h-screen p-5 text-5xl pb-7">
            <div className="flex flex-col items-center h-full gap-8">
              <div className="flex flex-col items-center gap-4">
                <h2 className="max-md:hidden">LABORAS</h2>
                <h2 className="md:hidden">L</h2>
                <Separator></Separator>
              </div>

              <div className="flex flex-col w-full gap-4 text-5xl ">
                <Link to="/posts">
                  <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                    <HomeIcon className="w-8 h-8 mr-1 text-biancapurple" />
                    Home
                  </Button>
                </Link>

                <Link to={`/posts/profile/${perfil?.username}`}>
                  <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full max-md:hidden h-fit pr-7 hover:bg-rebeccapurple">
                    <UserCircleIcon className="w-8 h-8 mr-1 text-biancapurple" />{" "}
                    Profile
                  </Button>
                  <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full max-md:hidden h-fit pr-7 hover:bg-rebeccapurple">
                    <UserCircleIcon className="w-8 h-8 mr-1 text-biancapurple" />{" "}
                    Profile
                  </Button>
                  <UserCircleIcon className="w-8 h-8 md:hidden text-biancapurple" />{" "}
                </Link>

                <Link to="/config">
                  <Button className="flex items-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                    <CogIcon className="w-8 h-8 mr-1 text-biancapurple" />{" "}
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
            <ProfileTag perfil={perfil!} />
          </div>
        </>
      )}
    </div>
  );
};
