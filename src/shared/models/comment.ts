import { IProfile } from "./profile";

export interface IComment {
    content: string,
    user: IProfile,
    postId: string,
    created_at: string,
} 