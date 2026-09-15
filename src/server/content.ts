"use server";

import { type SelectPostWithTags } from "@/db/schema";
import { type APIResponse } from "@/types";
import { getAllPostsWithTags } from "@/db/content";

export async function getAllPosts(): Promise<
  APIResponse<SelectPostWithTags[]>
> {
  const allPosts = await getAllPostsWithTags();

  return {
    success: true,
    message: "All posts returned in descending order",
    data: allPosts,
  } as APIResponse<SelectPostWithTags[]>;
}

// export async function getPostFromSlug(
//   slug: string,
// ): Promise<APIResponse<SelectPost | null>> {
//   const post = await db.select().from(posts).where(eq(posts.slug, slug));

//   if (!post || post.length === 0) {
//     console.log("Didn't find that post slug");
//     return {
//       success: false,
//       message: "Post with that slug could not be found",
//       data: null,
//     } as APIResponse<null>;
//   }
//   console.log("Found a post with that slug");
//   return {
//     success: true,
//     message: "Succesfully retrived post with that slug",
//     data: post[0],
//   } as APIResponse<SelectPost>;
// }
