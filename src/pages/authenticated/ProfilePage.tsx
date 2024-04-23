import { Link } from "react-router-dom";

export const ProfilePage = () => {
    return (
      <>
        <div className="">
          <h1>Profile Page</h1>
          <Link to="/posts">BACK TO TIMELINE</Link>
        </div>
      </>
    );
  };

export default ProfilePage