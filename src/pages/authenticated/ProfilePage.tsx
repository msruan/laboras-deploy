import { Profile } from "@/shared/components/Profile";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export const ProfilePage = () => {
  return (

      <div className="flex flex-col gap-1">
        <div>
          <Link to="/posts">
            <Button className="text-text font-bold bg-transparent pl-2 pt-5 pb-4 ml-0.5 mt-1 mb-1 hover:bg-transparent"><KeyboardArrowLeftIcon/>Back to timeline</Button>
            </Link>
          <Profile/>
        </div>
      </div>
  );
};

export default ProfilePage;
