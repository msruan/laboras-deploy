import { IProfile } from "@/models/profile";
import { PostContent } from "./PostContent";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { IComment } from "@/models/comment";

interface ICommentProps {
    perfil: IProfile;
    comment: IComment;
}
export function Comment({perfil, comment}: ICommentProps) {
  return (
    <Card>
      <Avatar className="w-12 h-12 rounded-full">
        <AvatarImage src="https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2023/07/31/pedro-flamengo-uv5ta7zqn5us.jpg" />

        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <PostContent perfil={perfil} post={comment}/>
    </Card>
  );
}
