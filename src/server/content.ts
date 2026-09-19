"use server";

import { type APIResponse } from "@/types";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  posts,
  postsTags,
  tags,
  type SelectPostWithTags,
  type SelectTag,
} from "@/db/schema";

export async function getAllPosts({
  onlyPublished = false,
}: {
  onlyPublished: boolean;
}): Promise<APIResponse<SelectPostWithTags[]>> {
  const rows = await db
    .select({
      post: posts,
      tag: tags,
    })
    .from(posts)
    .leftJoin(postsTags, eq(posts.id, postsTags.postId))
    .leftJoin(tags, eq(postsTags.tagId, tags.id))
    .where(onlyPublished ? eq(posts.published, true) : undefined)
    .orderBy(desc(posts.createdAt));

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

  return {
    success: true,
    message: "All posts returned in descending order",
    data: Array.from(postMap.values()) as SelectPostWithTags[],
  } as APIResponse<SelectPostWithTags[]>;
}

export async function getPostFromSlug(
  slug: string,
): Promise<APIResponse<SelectPostWithTags | null>> {
  const rows = await db
    .select({
      post: posts,
      tag: tags,
    })
    .from(posts)
    .leftJoin(postsTags, eq(posts.id, postsTags.postId))
    .leftJoin(tags, eq(postsTags.tagId, tags.id))
    .where(eq(posts.slug, slug));

  if (!rows || rows.length === 0 || !rows[0].post) {
    return {
      success: false,
      message: "Post with that slug could not be found",
      data: null,
    };
  }

  const post: SelectPostWithTags = {
    ...rows[0].post,
    tags: rows
      .map((row) => row.tag)
      .filter((tag): tag is SelectTag => tag !== null),
  };

  return {
    success: true,
    message: "Post retrieved from slug successfully",
    data: post,
  };
}

export async function getPostFromId(
  id: number,
): Promise<APIResponse<SelectPostWithTags | null>> {
  const rows = await db
    .select({
      post: posts,
      tag: tags,
    })
    .from(posts)
    .leftJoin(postsTags, eq(posts.id, postsTags.postId))
    .leftJoin(tags, eq(postsTags.tagId, tags.id))
    .where(eq(posts.id, id));

  if (!rows || rows.length === 0 || !rows[0].post) {
    return {
      success: false,
      message: "Post with that ID could not be found",
      data: null,
    };
  }

  const post: SelectPostWithTags = {
    ...rows[0].post,
    tags: rows
      .map((row) => row.tag)
      .filter((tag): tag is SelectTag => tag !== null),
  };

  return {
    success: true,
    message: "Post retrieved from slug successfully",
    data: post,
  };
}
