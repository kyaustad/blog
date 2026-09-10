import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readPurposeCookie } from "./server";

export async function proxy(request: NextRequest) {
  const session = await readPurposeCookie("session", "session");

  const path = request.nextUrl.pathname;

  if (path.startsWith("/auth")) {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (!session && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"],
};
