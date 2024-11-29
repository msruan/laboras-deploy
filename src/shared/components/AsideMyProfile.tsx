import { ProfileTag } from "./profile/ProfileTag";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
  CogIcon as CogIconFilled,
  HomeIcon as HomeIconFilled,
  UserCircleIcon as UserCircleIconFilled,
} from "@heroicons/react/16/solid";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { Logout } from "@/actions/AuthAction";
import { AlertLogout } from "./settings/AlertLogout";

export const AsideMyProfile = () => {
  const { user: perfil, signed } = useAuth();
  const local = useLocation();
  const localIsHome = local.pathname === "/";
  const localIsUser = local.pathname === `/users/${perfil?.username}`;
  const localIsConfig = local.pathname === "/config";

  const { setSigned } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setSigned(false);
    Logout();
    navigate("/login");
  };

  return (
    <div
      className={`flex flex-col max-xl:border-r-[1px] max-xl:border-gray-700  border-rebeccapurple2 xl:p-5 justify-between fixed top-0 left-0 min-h-screen overflow-x-hidden max-xl:w-fit max-md:hidden ml-24 w-72 z-1`}
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

          <div className="flex flex-col items-center justify-between w-full  h-screen p-5 text-5xl pb-7">
            <div className="flex flex-col items-center h-full gap-8">
              <div className="flex flex-col items-center gap-4">
                <Link to={"/"}>
                  <img src="src/assets/logo.svg" />
                </Link>
                <h2 className="xl:hidden">L</h2>
                <Separator></Separator>
              </div>

              <div className="flex flex-col w-full gap-4 text-5xl ">
                <Link to="/">
                  <Button className="flex items-center max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 xl:pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                    {localIsHome ? (
                      <HomeIconFilled className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
                    ) : (
                      <HomeIcon className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
                    )}
                    <span className="max-xl:hidden text-purple-400 dark:text-white">
                      Home
                    </span>
                  </Button>
                </Link>

                <Link to={`/users/${perfil?.username}`}>
                  <Button className="flex items-center  max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full max-md:hidden h-fit pr-7 hover:bg-rebeccapurple">
                    {localIsUser ? (
                      <UserCircleIconFilled className="w-8 h-8 max-xl:mr-0 mr-1 text-biancapurple" />
                    ) : (
                      <UserCircleIcon className="w-8 h-8 max-xl:mr-0 mr-1 text-biancapurple" />
                    )}
                    <span className="max-xl:hidden text-purple-400 dark:text-white">
                      Perfil
                    </span>
                  </Button>
                </Link>

                <Link to="/config">
                  <Button className="flex items-center  max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                    {localIsConfig ? (
                      <CogIconFilled className="w-8 h-8 mr-1 max-xl:mr-0 text-biancapurple" />
                    ) : (
                      <CogIcon className="w-8 h-8 mr-1 max-xl:mr-0 text-biancapurple" />
                    )}
                    <span className="max-xl:hidden text-purple-400 dark:text-white">
                      Configurações
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <Avatar className="w-12 xl:hidden h-12 rounded-full cursor-pointer">
              <AvatarImage
                src={perfil?.avatar_link ?? "src/assets/chorro-timido.JPG"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Card className="w-full cursor-pointer bg-rebeccapurple2 flex gap-4 p-2 border-0 rounded-full hover:bg-rebeccapurple transition-all duration-150">
                  <Avatar className="w-12 h-12 rounded-full cursor-pointer">
                    <AvatarImage
                      src={
                        perfil?.avatar_link ?? "src/assets/chorro-timido.JPG"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <CardContent className="flex gap-5 break-all justify-center items-center p-0">
                    <div className="flex flex-col items-start text-aliceblue text-sm gap-0.5">
                      <h3>
                        <strong>{perfil?.full_name}</strong>
                      </h3>
                      <h4 className="opacity-70">@{perfil?.username}</h4>
                    </div>
                  </CardContent>
                </Card>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <AlertLogout handleLogout={handleLogout} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
};
