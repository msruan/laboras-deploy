export interface IPost {
    id: string,
    user_id : string,
    content : string,
    created_at : string,
}

export type PostsResponse = {
    posts: IPost[]
}