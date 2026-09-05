// scripts/test-totp.ts
import { verify } from "otplib";
import { env } from "@/env";

const code = process.argv[2]; // pass the 6 digits from the app
if (!code) {
  console.error("Usage: bun ./scripts/test-totp.ts 123456");
  process.exit(1);
}

const result = await verify({ secret: env.TOTP_SECRET, token: code });
console.log(result.valid ? "TOTP OK" : "TOTP FAIL");