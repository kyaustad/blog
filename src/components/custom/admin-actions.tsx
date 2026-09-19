"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const MODE_MAP = {
  create: {
    header: "Create Post",
    link: "/admin/create",
    buttonText: "Create",
  },
  "all-posts": {
    header: "All Posts",
    link: "/admin/all-posts",
    buttonText: "Posts",
  },
  "browse-media": {
    header: "Browse All Media",
    link: "/admin/media/browse",
    buttonText: "Browse",
  },
  "upload-media": {
    header: "Upload Media",
    link: "/admin/media/upload",
    buttonText: "Upload",
  },
};

//  Waddup Dude
export function ActionCard({
  mode,
  className,
}: {
  mode: "create" | "all-posts" | "browse-media" | "upload-media";
  className?: string;
}) {
  const router = useRouter();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl text-center">
          {MODE_MAP[mode].header}
        </CardTitle>
        <CardContent className="flex my-4 flex-row items-center">
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              router.push(MODE_MAP[mode].link);
            }}
          >
            {MODE_MAP[mode].buttonText}
          </Button>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export function BackToDashboard() {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push("/admin/dashboard");
      }}
    >
      Back To Dashboard
    </Button>
  );
}
