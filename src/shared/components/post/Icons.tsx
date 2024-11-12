import { InteractPost } from "@/actions/PostAction";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { IPost } from "../../models/post";

type IconInteractsProps = {
  icon: JSX.Element;
  count: number;
  onClick: () => void;
  activeColor: string;
  inactiveColor: string;
};

const IconInteracts = ({
  icon,
  count,
  onClick,
  activeColor,
  inactiveColor,
}: IconInteractsProps) => (
  <div className="flex justify-between items-center text-sm">
    <span>{count > 0 && count}</span>
    <span
      className={`h-4 w-4 cursor-pointer ${
        count > 0 ? activeColor : inactiveColor
      }`}
      onClick={onClick}
    >
      {icon}
    </span>
  </div>
);

export const Icons = ({ post }: { post: IPost }) => {
  const { mutate: handleLikePost } = InteractPost("like");
  const { mutate: handleDislikePost } = InteractPost("dislike");


  return (
    <>
      <IconInteracts
        icon={<StarIcon />}
        count={post.likes}
        onClick={() => handleLikePost(post.uid)}
        activeColor="text-yellow-500"
        inactiveColor="text-gray-500"
      />
      <IconInteracts
        icon={<FaceFrownIcon />}
        count={post.dislikes}
        onClick={() => handleDislikePost(post.uid)}
        activeColor="text-red-500"
        inactiveColor="text-gray-500"
      />
    </>
  );
};
