"use server";

import { readPurposeCookie } from "@/server";
import MFAForm from "@/components/custom/mfa-form";
import { redirect } from "next/navigation";

export default async function MFAPage() {
  const session = await readPurposeCookie("mfa_pending", "mfa_pending");
  if (!session) {
    return redirect("/auth/login");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>MFA Page</h1>
      <MFAForm />
    </div>
  );
}
