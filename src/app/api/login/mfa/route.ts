import { verifyMfa } from "@/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { otp } = await request.json();
  const result = await verifyMfa(otp);
  console.log(result);
  if (result.success) {
    return NextResponse.json({ ok: true }, { status: 200 });
  } else {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }
}
