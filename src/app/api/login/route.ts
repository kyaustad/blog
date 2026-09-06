import { login } from "@/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  if (email && password) {
    const result = await login(email, password);
    if (result.success) {
      return NextResponse.json({ ok: true }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }
  }
}
