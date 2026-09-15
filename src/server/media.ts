"use server";

import { env } from "@/env";
import { type APIResponse } from "@/types";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(env.CLOUDINARY_URL);

export async function uploadMedia(
  media: File,
  type: "image" | "video",
): Promise<APIResponse<string>> {
  const bytes = Buffer.from(await media.arrayBuffer());
  const dataUri = `data:${media.type || "application/octet-stream"};base64,${bytes.toString("base64")}`;

  // public_id should be a clean id, not the raw filename with spaces/extensions
  const publicId = media.name.replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-");

  const result = await cloudinary.uploader.upload(dataUri, {
    resource_type: type,
    public_id: publicId,
    folder: `blog/${type}s`, // no leading slash
    overwrite: true,
  });

  return {
    success: true,
    message: "Media uploaded successfully",
    data: result.secure_url,
  };
}
