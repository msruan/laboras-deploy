import { GetProfileByUsername } from "@/actions/ProfileAction";
import { useAuth } from "@/context/AuthContext";
import { Profile } from "@/shared/components/profile/Profile";
import { ProfileMobile } from "@/shared/components/profile/ProfileMobile";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const {
    response: profile,
    isSuccess,
    refetch,
  } = GetProfileByUsername(username!);

  function handleGoBack() {
    navigate(-1);
  }

  useEffect(() => {
    refetch();
  }, [username]);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <div className="fixed justify-center items-center top-0 flex p-2 w-full bg-black border-b-[1px] border-b-gray-500 sm:hidden ">
          <ChevronLeftIcon
            cursor={"pointer"}
            onClick={handleGoBack}
            className="fixed w-6 h-6 left-3 top-2"
          ></ChevronLeftIcon>
          <h1 className="font-bold">{profile?.username}</h1>
        </div>
        {isSuccess ? (
          profile && (
            <>
              <Profile profile={profile} />
              <ProfileMobile profile={profile} />
            </>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
