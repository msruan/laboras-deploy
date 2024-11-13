import { InteractPost } from "@/actions/PostAction";
import { FaceFrownIcon, StarIcon } from "@heroicons/react/16/solid";
import { IPost } from "../../models/post";

type IconInteractsProps = {
  icon: JSX.Element;
  count: number;
  isLiked?: boolean;
  isDisliked?: boolean;
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
  isLiked,
  isDisliked,
}: IconInteractsProps) => (
  <div className="flex justify-between items-center text-sm">
    <span>{count > 0 && count}</span>
    <span
      className={`h-4 w-4 cursor-pointer ${
        isLiked || isDisliked ? activeColor : inactiveColor
      }`}
      onClick={onClick}
    >
      {icon}
    </span>
  </div>
);

export const Icons = ({ post }: { post: IPost }) => {
  const { mutate: handleLikePost } = InteractPost("toggle-like");
  const { mutate: handleDislikePost } = InteractPost("toggle-dislike");


  return (
    <>
      <IconInteracts
        icon={<StarIcon />}
        count={post.likes}
        isLiked={post.liked_by_me}
        onClick={() => handleLikePost(post.uid)}
        activeColor="text-yellow-500"
        inactiveColor="text-gray-500"
      />
      <IconInteracts
        icon={<FaceFrownIcon />}
        count={post.dislikes}
        isDisliked={post.disliked_by_me}
        onClick={() => handleDislikePost(post.uid)}
        activeColor="text-red-500"
        inactiveColor="text-gray-500"
      />
    </>
  );
};
