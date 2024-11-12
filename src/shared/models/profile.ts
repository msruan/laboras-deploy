import { IPost } from "./post";

export interface ProfileBase {
  uid: string;
  username: string;
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  avatar_link: string;
  bio: string;
}

export interface ProfileDetailed extends ProfileBase {
  posts: IPost[];
  following: ProfileBase[];
}

export interface ProfileUpdate {
  full_name: string;
  password: string;
}
