"use client";

import Image from "next/image";
import { Input } from "../ui/input";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function FileUploader() {
  const router = useRouter();
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const previewUrl = React.useMemo(() => {
    if (!file) return null;

    return URL.createObjectURL(file);
  }, [file]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.currentTarget.files?.[0] ?? null;

    setFile(selectedFile);
  }

  const handleUpload = async () => {
    if (!file) {
      return null;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("media", file);
    formData.append("type", "image");

    const response = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data?.success || !data.data) {
      setIsLoading(false);
      toast.error("Error uploading file!");
      throw new Error(data?.message ?? "Image upload failed");
    }
    setIsLoading(false);

    if (data.data) {
      toast.success("File Upload Successful!");
    }
  };

  return (
    <div className="mx-auto min-h-[90vh] w-full max-w-screen-md p-8 gap-6 flex flex-col">
      <Button
        onClick={() => {
          router.push("/admin/dashboard");
        }}
      >
        Back To Dashboard
      </Button>
      <Input type="file" accept="image/*" onChange={handleFileChange} />

      {previewUrl && (
        <div className="mt-4">
          <Image
            height={512}
            width={512}
            src={previewUrl}
            alt={file?.name ?? "Selected image"}
            className="max-h-96 w-auto max-w-full rounded-lg object-contain"
          />

          <p className="mt-2 text-sm text-muted-foreground">{file?.name}</p>
        </div>
      )}

      {file && (
        <Button disabled={isLoading} onClick={handleUpload}>
          {isLoading ? `Uploading` : `Upload`}
        </Button>
      )}
    </div>
  );
}
