import { NextRequest, NextResponse } from "next/server";
import { readPurposeCookie } from "@/server";
import { db } from "@/db";
import type { APIResponse } from "@/types";
import { env } from "@/env";
import {
  posts,
  type SelectPostWithTags,
  type InsertPost,
  postsTags,
  SelectTag,
} from "@/db/schema";
import { getPostFromId } from "@/server/content";

// Getting all posts with tags is done via server action, since it never requires auth or form data and makes that easier to manage
// as a deliberate seperation of admin and consumer privileges

// POST:  Create new post, requires auth
export async function POST(req: NextRequest) {
  console.log("Post request recived");
  const session = await readPurposeCookie("session", "session");
  if (!session || session.sub !== env.ADMIN_EMAIL) {
    console.log("Determined Session invalid");
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  }

  try {
    const body = await req.json();
    const newPost: InsertPost = {
      title: body.title,
      content: body.content,
      featuredImage: body.featuredImage,
      summary: body.summary,
      postedBy: body.postedBy,
      createdAt: body.createdAt ?? new Date().toString(),
      slug: body.slug,
      published: body.published,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
    };
    const tags: SelectTag[] = body.tags;

    const post = await db.insert(posts).values(newPost).returning();

    if (!post || post.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Failed to create post",
        data: null,
      } as APIResponse<null>);
    }

    for (const tag of tags) {
      await db.insert(postsTags).values({ postId: post[0].id, tagId: tag.id });
    }

    const finalResponse = await getPostFromId(post[0].id);

    if (!finalResponse || !finalResponse.success) {
      return NextResponse.json({
        success: false,
        message: "Failed to retrieve final post after tag addition!",
        data: null,
      } as APIResponse<null>);
    }

    return NextResponse.json({
      success: true,
      message: "Post created successfully",
      data: finalResponse.data as SelectPostWithTags,
    } as APIResponse<SelectPostWithTags>);
  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  }
}

// PUT: Update Post, requries auth
// export async function PUT(req: NextRequest) {
//   await returnIfNoSession();
//   await returnIfSessionInvalid();
// }

// // DELETE: Delete Post, requires auth
// export async function DELETE(req: NextRequest) {
//   await returnIfNoSession();
//   await returnIfSessionInvalid();
// }
