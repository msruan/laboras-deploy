import { ProfileTag } from "./profile/ProfileTag";
import { ScrollArea } from "./ui/scrolarea";
import { useAuth } from "@/context/AuthContext";

type Props = {
  className?: string;
};

export const AsideFollowers = ({ ...props }: Props) => {
  const { user, signed } = useAuth();
  const followers = user?.following;

  return (
    <>
      {signed ? (
        <>
          <div
            className={`flex flex-col items-center p-6 gap-3 fixed top-0 right-0 min-h-screen overflow-x-hidden max-xl:hidden w-72 z-1`}
          >
            <h2 className="text-white font-sans text-2xl font-bold">
              {followers?.length ? "Seguimores" : "Seu flopado..."}
            </h2>
            <ScrollArea className="flex flex-row h-lvh w-60">
              <div className="min-h-full flex flex-col gap-11">
                {followers!.map((profile) => (
                  <ProfileTag key={profile.uid} perfil={profile} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      ) : (
        <h1>ERROR</h1>
      )}
    </>
  );
};
