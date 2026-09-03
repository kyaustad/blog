import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";
 
export const env = createEnv({
  server: {
    TURSO_AUTH_TOKEN: z.string().min(1),
    TURSO_CONNECTION_URL: z.string().min(1),
    ADMIN_EMAIL: z.email(),
    ADMIN_PASSWORD: z.string().min(1),
    JWT_SECRET: z.string().min(16),
    PASSWORD_HASH: z.string().min(1),
    PASSWORD_TEST: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    TURSO_CONNECTION_URL: process.env.TURSO_CONNECTION_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    PASSWORD_HASH: process.env.PASSWORD_HASH,
    PASSWORD_TEST: process.env.PASSWORD_TEST,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});