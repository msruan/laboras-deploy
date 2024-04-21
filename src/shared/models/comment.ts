import { IPost } from "./post";
import { IUser } from "./user";

export interface IComment {
  content: string;
  user: IUser;
  post: IPost;
  created_at: Date;
}
