import { IPost } from "@/shared/models/post";
import { GetAllPosts } from "./PostAction";

export function getRelationedPost(
  post: IPost,
  posts: IPost[] | undefined
): IPost[] | undefined {
  let relationedPosts: IPost[] = [];

  if (posts) {
    relationedPosts = posts.filter((comment) => comment.linked_to === post.id);
  }

  return relationedPosts;
}
