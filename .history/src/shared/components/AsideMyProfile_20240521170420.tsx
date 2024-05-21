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

          c
        </>
      )}
    </div>
  );
};
