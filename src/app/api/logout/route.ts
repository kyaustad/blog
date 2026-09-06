import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, clearMfaPendingCookie } from "@/server";

export async function POST(_: NextRequest) {
  await clearSessionCookie();
  await clearMfaPendingCookie();

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
