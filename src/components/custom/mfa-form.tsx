"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MFAForm() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch("/api/login/mfa", {
      method: "POST",
      body: JSON.stringify({ otp }),
    });
    if (response.ok) {
      toast.success("Welcome Back Doooche");
      router.push("/admin/dashboard");
    } else {
      toast.error("Nah Bruh, Try Again");
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center"
    >
      <InputOTP maxLength={6} value={otp} onChange={setOtp}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTP>
      <Button
        type="submit"
        disabled={loading || otp.length !== 6}
        onClick={handleSubmit}
      >
        {otp.length === 6 ? "Submit" : "Enter OTP"}
      </Button>
    </form>
  );
}
