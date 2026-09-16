"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import * as React from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export function MediaCard({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return (
    <div className="group relative aspect-square w-full overflow-hidden bg-accent">
      <Image
        loading="eager"
        alt="Media Image"
        src={url}
        height={256}
        width={256}
        onClick={() => {
          navigator.clipboard.writeText(url);
          toast.success("Copied URL to clipboard!");
        }}
        className={cn(
          className,
          "object-contain w-auto p-2 h-auto hover:scale-95 transition-all duration-700 cursor-pointer",
        )}
      ></Image>
      <Button
        variant={"destructive"}
        aria-label="Delete Media"
        onClick={() => {
          toast.success("Mock Deleted!");
        }}
        className="absolute left-1/2 top-1/2  opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        size={"icon"}
      >
        <TrashIcon></TrashIcon>
      </Button>
    </div>
  );
}
