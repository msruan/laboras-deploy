export interface IPost {
    id: string,
    user_id : string,
    content : string,
    created_at : string,
    likes : number,
    deslikes : number,
    linked_to: string | null
}

export type PostRequest = {
    id: string,
    user_id? : string,
    content? : string,
    created_at? : string,
    likes? : number,
    deslikes? : number
}