import { NextRequest, NextResponse } from "next/server";
import { readPurposeCookie } from "@/server";
import { db } from "@/db";
import type { APIResponse } from "@/server";
import { env } from "@/env";

// Helper function. Return from API early if no session cookie exists for the session purpose.
async function returnIfNoSession() {
  const hasSession = await readPurposeCookie("session", "session");

  if (!hasSession) {
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  }
}

async function returnIfSessionInvalid() {
  const session = await readPurposeCookie("session", "session");

  if (!session) {
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  }

  if (session.sub !== env.ADMIN_EMAIL) {
    return NextResponse.json({
      success: false,
      message: "Silly Rabbit, Trix are for kids",
      data: null,
    } as APIResponse<null>);
  }
}

// Get all posts, does not require auth
export async function GET(req: NextRequest) {}

// POST:  Create new post, requires auth
export async function POST(req: NextRequest) {
  await returnIfNoSession();
  await returnIfSessionInvalid();
}

// PUT: Update Post, requries auth
export async function PUT(req: NextRequest) {
  await returnIfNoSession();
  await returnIfSessionInvalid();
}

// DELETE: Delete Post, requires auth
export async function DELETE(req: NextRequest) {
  await returnIfNoSession();
  await returnIfSessionInvalid();
}
