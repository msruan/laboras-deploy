import { ProfileBase } from "./profile";

export interface IPost {
  uid: string;
  content: string;
  owner: ProfileBase;
  created_at: string;
  updated_at: string
  likes: number,
  dislikes: number,
  liked_by_me: boolean,
  disliked_by_me: boolean,
  linked_to: IPost[] | null
}

export type Posts = {
  posts: IPost[]
}

export interface IInitialPost {
  title: string;
  content: string;
}

export type PostRequest = {
  uid?: string;
  token?: string
  content?: string;
};

// "posts": [
//   {
//     "uid": "fb3fbff2-0f8b-4966-a601-18d2c2d9a41a",
//     "content": "Herminio neto eh vagabundo",
//     "owner": {
//       "uid": "69efb6cf-92b0-48f7-80ea-a167310482b3",
//       "username": "bianque",
//       "full_name": "bianque",
//       "email": "bianque",
//       "bio": "",
//       "avatar_link": "",
//       "posts": [],
//       "following": [],
//       "created_at": "2024-11-11T20:38:11.581881",
//       "updated_at": "2024-11-11T20:38:11.581885"
//     },
//     "created_at": "2024-11-11T11:30:17.248036",
//     "updated_at": "2024-11-11T11:30:17.248040",
//     "likes": 1,
//     "dislikes": 0,
//     "liked_by_me": false,
//     "disliked_by_me": false,
//     "linked_to": []
//   }