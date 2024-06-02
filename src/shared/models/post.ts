import { IProfile } from "./profile";

export interface IPost {
  _id?: string;
  user_id: string;
  content: string;
  createdAt: string;
  likes: number;
  deslikes: number;
  linked_to: string | null;
}
export interface IInitialPost {
  user_id: string;
  content: string;
  linked_to: string | null;
}

export type PostRequest = {
  id: string;
  content?: string;
  likes?: number;
  deslikes?: number;
};
