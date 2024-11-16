import { IPost } from "./post";

export interface ProfileBase {
  uid: string;
  username: string;
  full_name: string;
  email: string;
  following: ProfileBase[];
  followed_by?: ProfileBase[];
  created_at: string;
  updated_at: string;
  avatar_link: string;
  bio: string;
}

export interface ProfileDetailed extends ProfileBase {
  posts: IPost[];
  following: ProfileBase[];
  followed_by: ProfileBase[];
}

export interface ProfileUpdate {
  full_name: string;
  password: string;
  bio: string
  avatar_link: string
}
