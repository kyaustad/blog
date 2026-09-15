import { eq } from "drizzle-orm";
import { db } from "./index";
import { posts, postsTags, tags, type SelectPostWithTags } from "./schema";

export async function getAllPostsWithTags(): Promise<SelectPostWithTags[]> {
  const rows = await db
    .select({
      post: posts,
      tag: tags,
    })
    .from(posts)
    .leftJoin(postsTags, eq(posts.id, postsTags.postId))
    .leftJoin(tags, eq(postsTags.tagId, tags.id));

  const postMap = new Map<number, SelectPostWithTags>();

  for (const row of rows) {
    let post = postMap.get(row.post.id);

    if (!post) {
      post = {
        ...row.post,
        tags: [],
      };
    }
  }

  return Array.from(postMap.values()) as SelectPostWithTags[];
}
