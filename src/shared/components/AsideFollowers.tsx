import { ProfileTag } from "./ProfileTag";
import { ScrollArea } from "./ui/scrolarea";
import {GetProfileFollowers } from "@/actions/ProfileAction";

type AsideFollowersProps = {
  idLoggedUser: string;
  className: string;
};

export const AsideFollowers = ({
  idLoggedUser,
  className,
}: AsideFollowersProps) => {
  const { response: followers, isSuccess, isLoading } = GetProfileFollowers();

  return (
    <div
      className={`flex flex-col border-l-2 items-center border-rebeccapurple2 p-6 gap-3 ${className}`}
    >
      {isLoading && <h2>Carregando...</h2>}
      {isSuccess && (
        <>
          <h2 className="text-white font-sans text-2xl font-bold">
            Your followers
          </h2>
          <ScrollArea className="flex flex-row h-lvh w-60">
            <div className="min-h-full flex flex-col gap-11">
              {followers!.map((profile) => (
                <ProfileTag key={profile.id} perfil={profile} />
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};
