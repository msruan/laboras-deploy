import { ProfileBase } from "./profile";

export interface IComment {
    content: string,
    user: ProfileBase,
    postId: string,
    created_at: string,
} 