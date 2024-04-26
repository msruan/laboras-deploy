import Post from "@/components/Post";
import { MainPosts } from "../../shared/components/MainPosts";
import { Link } from "react-router-dom";
import { IPost } from "@/models/post";

const myPost: IPost = {
  "id": "OIARHPOGIUAHREWOGIUAHWOIUGHAWRGA",
  "user_id": "2",
  "content": `olaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  "created_at": "Thu Apr 25 2024 10:20:52 GMT-0300 (Hora padrão de Brasília)"
};

export const PostsPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Post post={myPost} fullpage={true} handleDelete={function (event: React.MouseEvent<HTMLElement>): void {
        throw new Error("Function not implemented.");
      } } fullBorder={false} />
      <div>
        <Post post={myPost} handleDelete={function (event: React.MouseEvent<HTMLElement>): void {
          throw new Error("Function not implemented.");
        } } fullpage={false} fullBorder={true} />
      </div>
    </div>
  );
};

export default PostsPage;
