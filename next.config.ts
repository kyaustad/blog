import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { env } from "./src/env";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL(`https://res.cloudinary.com/**`),
      new URL(`https://blog.kyleaustad.dev/**`),
    ],
  },
};

export default nextConfig;
