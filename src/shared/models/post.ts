export interface IPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  likes: number;
  deslikes: number;
  linked_to: string | null;
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
