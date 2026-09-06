import { NextRequest, NextResponse } from "next/server";
import { readPurposeCookie, uploadMedia } from "@/server";
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

export async function POST(req: NextRequest) {
  const noSession = await returnIfNoSession();
  if (noSession) return noSession;

  const invalid = await returnIfSessionInvalid();
  if (invalid) return invalid;

  const formData = await req.formData();
  const media = formData.get("media");
  const type = formData.get("type");

  if (!(media instanceof File) || media.size === 0) {
    return NextResponse.json({
      success: false,
      message: "No file uploaded",
      data: null,
    } satisfies APIResponse<null>);
  }

  if (type !== "image" && type !== "video") {
    return NextResponse.json({
      success: false,
      message: "Invalid type",
      data: null,
    } satisfies APIResponse<null>);
  }

  try {
    const result = await uploadMedia(media, type);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Upload failed", data: null },
      { status: 500 },
    );
  }
}
