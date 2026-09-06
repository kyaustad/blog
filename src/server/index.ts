"use server";

import argon2 from "argon2";
import { env } from "@/env";
import * as jose from "jose";
import { cookies } from "next/headers";
import { verify } from "otplib";
import { posts, type SelectPost } from "@/db/schema";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(env.CLOUDINARY_URL);

export type APIResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

/* Helper function to verify the password using argon2 */
async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await argon2.verify(hashedPassword, password);
}

async function issueMfaPendingCookie() {
  const token = await new jose.SignJWT({
    sub: env.ADMIN_EMAIL,
    purpose: "mfa_pending",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(new TextEncoder().encode(env.JWT_SECRET));

  const jar = await cookies();
  jar.set("mfa_pending", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 5 * 60, // 5 minutes
  });
}

export async function clearMfaPendingCookie() {
  (await cookies()).delete("mfa_pending");
}

async function issueSessionCookie() {
  const token = await new jose.SignJWT({
    sub: env.ADMIN_EMAIL,
    purpose: "session",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(new TextEncoder().encode(env.JWT_SECRET));

  const jar = await cookies();
  jar.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearSessionCookie() {
  (await cookies()).delete("session");
}

export async function readPurposeCookie(
  name: string,
  expectedPurpose: "mfa_pending" | "session",
) {
  const jar = await cookies();
  const value = jar.get(name)?.value;

  if (!value) return null;

  try {
    const { payload } = await jose.jwtVerify(
      value,
      new TextEncoder().encode(env.JWT_SECRET),
    );
    if (payload.purpose !== expectedPurpose) return null;
    return payload;
  } catch (err) {
    console.warn(err);
    return null; //expired or invalid
  }
}

// If login is successful move to TOTP/OTP verification before issuing the full session token
export async function login(
  email: string,
  password: string,
): Promise<APIResponse<null>> {
  if (email !== env.ADMIN_EMAIL) {
    return {
      success: false,
      message: "Wrong Credentials Dumbass",
    };
  }
  const passwordValid = await verifyPassword(password, env.PASSWORD_HASH);

  if (!passwordValid) {
    return {
      success: false,
      message: "Wrong Credentials Dumbass",
    };
  }

  await issueMfaPendingCookie();

  return {
    success: true,
    message: "MFA Required",
    data: null,
  };
}

export async function verifyMfa(code: string) {
  const mfaPending = await readPurposeCookie("mfa_pending", "mfa_pending");
  if (!mfaPending) {
    return { success: false, message: "You took too long. Start Over" };
  }

  const result = await verify({ secret: env.TOTP_SECRET, token: code });

  if (!result || !result.valid) {
    return { success: false, message: "Nope, not it bud" };
  }

  await clearMfaPendingCookie();
  await issueSessionCookie();

  return { success: true, message: "Welcome Back Doooche", data: null };
}

export async function getAllPosts(): Promise<APIResponse<SelectPost[]>> {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return {
    success: true,
    message: "All posts returned in descending order",
    data: allPosts,
  } as APIResponse<SelectPost[]>;
}

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
