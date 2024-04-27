import Post from "@/shared/components/Post";
import { MainPosts } from "../../shared/components/MainPosts";
import { Link } from "react-router-dom";
import { IPost } from "@/shared/models/post";

const myPost: IPost = {
  "id": "OIARHPOGIUAHREWOGIUAHWOIUGHAWRGA",
  "user_id": "2",
  "content": `olaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  "created_at": "Thu Apr 25 2024 10:20:52 GMT-0300 (Hora padrão de Brasília)"
};

export const PostsPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Post post={myPost} fullpage={true} fullBorder={false} handleDelete={function (postId: string): void {
        throw new Error("Function not implemented.");
      } } />
      <div>
        <Post post={myPost} fullpage={false} fullBorder={true} handleDelete={function (postId: string): void {
          throw new Error("Function not implemented.");
        } } />
      </div>
    </div>
  );
};

export default PostsPage;
