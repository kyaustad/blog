import path from "path";
import argon2 from "argon2";
import { env } from "@/env";

const password = env.ADMIN_PASSWORD;

const hashPassword = async () => {
    const hash = await argon2.hash(password);
    return hash;
}


console.log(await hashPassword());