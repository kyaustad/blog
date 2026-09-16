"use server";

import { env } from "@/env";
import { type APIResponse } from "@/types";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/db";
import { media, type InsertMedia, type SelectMedia } from "@/db/schema";

cloudinary.config(env.CLOUDINARY_URL);

export async function storeMediaUrlInDb(
  url: string,
): Promise<APIResponse<SelectMedia | null>> {
  const result = await db.insert(media).values({ url: url }).returning();

  if (!result || result.length === 0) {
    return {
      success: false,
      message: "Failed to save to db and return the value",
      data: null,
    };
  }

  return {
    success: true,
    message: "Successfully saved URL to Media table",
    data: result[0] as SelectMedia,
  } as APIResponse<SelectMedia>;
}

export async function uploadMedia(
  media: File,
  type: "image" | "video",
  storeInDb?: boolean,
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

  if (storeInDb) {
    const storeResult = await storeMediaUrlInDb(result.secure_url);

    if (!storeResult.success) {
      return {
        success: false,
        message: "Upload successful but saving to DB failed",
        data: "None",
      };
    }
  }

  return {
    success: true,
    message: "Media uploaded successfully",
    data: result.secure_url,
  };
}

export async function getAllMedia(): Promise<APIResponse<string[]>> {
  const mediaRows = await db.select().from(media);

  if (!mediaRows || mediaRows.length === 0) {
    return {
      success: false,
      message: "Couldn't retreive any stored media",
      data: [],
    };
  }

  const urls = mediaRows.map((row) => row.url);

  return {
    success: true,
    message: "All media URLs retrieved successfully",
    data: urls,
  };
}
