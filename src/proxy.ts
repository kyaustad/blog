import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readPurposeCookie } from "./server";

export async function proxy(request: NextRequest) {
  const session = await readPurposeCookie("session", "session");
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
