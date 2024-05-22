import { Profile } from "@/shared/components/profile/Profile";
import { Button } from "@/shared/components/ui/button";
import { Link, useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { GetProfileByUsername } from "@/actions/ProfileAction";
import { useEffect } from "react";

export const ProfilePage = () => {
  const { username } = useParams();
  const {
    response: profile,
    isSuccess,
    refetch,
  } = GetProfileByUsername(username!);

  if (isSuccess) {
    if (profile) console.log(profile);
  }

  useEffect(() => {
    refetch();
  }, [username]);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <Link to="/posts">
          <Button className="text-text font-bold bg-transparent pl-2 pt-5 pb-4 ml-0.5 mt-1 mb-1 hover:bg-transparent">
            <KeyboardArrowLeftIcon />
            Back to timeline
          </Button>
        </Link>

        {isSuccess ? (
          profile && <Profile profile={profile} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
