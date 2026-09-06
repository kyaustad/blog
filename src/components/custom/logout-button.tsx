"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { SignOutIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      toast.success("Logged out successfully");
      router.push("/auth/login");
    } else {
      toast.error("Failed to logout");
    }
  };

  return (
    <Button variant="default" size="sm" onClick={handleLogout}>
      Logout
      <SignOutIcon className="h-5 w-5" />
    </Button>
  );
}
