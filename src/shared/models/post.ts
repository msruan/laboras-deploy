import { IProfile } from "./profile";

export interface IPost {
  _id: string;
  user_id: string;
  content: string;
  createdAt: string;
  likes: number;
  deslikes: number;
  linked_to: string | null;
  user: IProfile;
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
