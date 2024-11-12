import { ProfileBase } from "./profile";

export interface IPost {
  uid: string;
  content: string;
  owner: ProfileBase;
  created_at: string;
  linked_to: string[] | null;
}

export type Posts = {
  posts: IPost[]
}

export interface IInitialPost {
  title: string;
  content: string;
}

export type PostRequest = {
  id: string;
  content?: string;
  likes?: number;
  deslikes?: number;
};


        // {
        //     "uid": "8edc0f02-9b27-4417-b96b-116a89ee3d35",
        //     "content": "string",
        //     "owner": {
        //         "uid": "2b3afefe-3bda-427d-83a6-ba5e56316478",
        //         "username": "string",
        //         "full_name": "string",
        //         "email": "string",
        //         "posts": [],
        //         "following": [],
        //         "created_at": "2024-11-10T23:11:53.899396",
        //         "updated_at": "2024-11-10T23:11:53.904824"
        //     },
        //     "created_at": "2024-11-10T23:12:22.541756",
        //     "updated_at": "2024-11-10T23:12:22.541760",
        //     "linked_to": []
        // },