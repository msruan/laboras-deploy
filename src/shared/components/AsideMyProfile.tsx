import { ProfileTag } from "./profile/ProfileTag";
// import { AvatarIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { GetProfileById } from "@/actions/ProfileAction";
import { CogIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type AsideMyProfileProps = {
  className: string;
};

export const AsideMyProfile = () => {
  const { user: perfil, signed } = useAuth();
  const idLoggedUser = perfil?.id;
  // const { response: perfil, isSuccess } = GetProfileById(idLoggedUser ?? "");
  return (
    <div
      className={`flex flex-col max-xl:border-r-[1px] max-xl:border-gray-700  border-rebeccapurple2 xl:p-5 justify-between fixed top-0 left-0 min-h-screen overflow-x-hidden max-xl:w-fit max-md:hidden w-72 z-1`}
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
                <Link to={"/posts"}>
                  <h2 className="max-xl:hidden">LABORAS</h2>
                </Link>
                <h2 className="xl:hidden">L</h2>
                <Separator></Separator>
              </div>

              <div className="flex flex-col w-full gap-4 text-5xl ">
                <Link to="/posts">
                  <Button className="flex items-center max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 xl:pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                    <HomeIcon className="w-8 max-xl:mr-0 h-8 mr-1 text-biancapurple" />
                    <span className="max-xl:hidden">Home</span>
                  </Button>
                </Link>

                <Link to={`/posts/profile/${perfil?.username}`}>
                  <Button className="flex items-center  max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full max-md:hidden h-fit pr-7 hover:bg-rebeccapurple">
                    <UserCircleIcon className="w-8 h-8 max-xl:mr-0 mr-1 text-biancapurple" />{" "}
                    <span className="max-xl:hidden">Profile</span>
                  </Button>
                </Link>

                <Link to="/config">
                  <Button className="flex items-center  max-xl:p-0 max-xl:pb-2 max-xl:justify-center justify-start w-full gap-4 p-1 pl-3 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-full h-fit pr-7 hover:bg-rebeccapurple">
                    <CogIcon className="w-8 h-8 mr-1 max-xl:mr-0 text-biancapurple" />{" "}
                    <span className="max-xl:hidden">Settings</span>
                  </Button>
                </Link>
              </div>
            </div>
            <ProfileTag perfil={perfil!} />
            <Avatar className="w-12 xl:hidden h-12 rounded-full cursor-pointer">
              <AvatarImage
                src={
                  perfil?.profile_image_link ?? "src/assets/chorro-timido.JPG"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </>
      )}
    </div>
  );
};
