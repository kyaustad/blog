import { NextRequest, NextResponse } from "next/server";
import { readPurposeCookie } from "@/server";
import { db } from "@/db";
import type { APIResponse } from "@/types";
import { env } from "@/env";
import { SelectTag, tags } from "@/db/schema";
import { eq } from "drizzle-orm";

async function hasSession(): Promise<boolean> {
  const hasSession = await readPurposeCookie("session", "session");

  if (!hasSession) {
    return false;
  }
  return true;
}

async function sessionIsValid(): Promise<boolean> {
  const session = await readPurposeCookie("session", "session");

  if (!session) {
    return false;
  }

  if (session.sub !== env.ADMIN_EMAIL) {
    return false;
  }

  return true;
}

export async function GET(req: NextRequest) {
  const foundTags = await db.select().from(tags);

  return NextResponse.json({
    success: true,
    message: "Tags retrieved from DB successfully!",
    data: foundTags ?? [],
  } as APIResponse<SelectTag[]>);
}

export async function DELETE(req: NextRequest) {
  const sessionExists = await hasSession();
  if (!sessionExists)
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  const sessionValid = await sessionIsValid();
  if (!sessionValid)
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);

  const body = await req.json();
  const tagId = body.tagId;

  try {
    await db.delete(tags).where(eq(tags.id, tagId));
  } catch {
    return NextResponse.json({
      success: false,
      message: "Error deleting tag from DB",
      data: null,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Successfully deleted tag from DB!",
    data: null,
  });
}

export async function PUT(req: NextRequest) {
  const sessionExists = await hasSession();
  if (!sessionExists)
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  const sessionValid = await sessionIsValid();
  if (!sessionValid)
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);

  const body = await req.json();
  const tagTitle = body.tagTitle;

  let newTagId;
  try {
    const newTag = (
      await db.insert(tags).values({ title: tagTitle }).returning()
    )[0];

    if (!newTag) {
      return NextResponse.json({
        success: false,
        message: "Error adding or returning new tag from DB!",
        data: null,
      });
    }
    newTagId = newTag.id;
  } catch {
    return NextResponse.json({
      success: false,
      message: "Error adding tag to DB",
      data: null,
    });
  }

  return NextResponse.json({
    success: true,
    message: "Successfully added tag to DB!",
    data: { id: newTagId, title: tagTitle },
  });
}
