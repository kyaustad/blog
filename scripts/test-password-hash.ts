import argon2 from "argon2";
import { env } from "@/env";

const password = env.PASSWORD_TEST;
const hash = env.PASSWORD_HASH;

const testPassword = async () => {
    console.log("HASH starts with....", JSON.stringify(hash.slice(0, 20)));
    
    if (!hash || hash === "") {
        throw new Error("PASSWORD_HASH is not set");
    }
    if (!password || password === "") {
        throw new Error("PASSWORD_TEST is not set");
    }
    try {
        const isValid = await argon2.verify(hash, password);
        return isValid;
    } catch (error) {
        console.error(error);
        return false;
    }
}

console.log(await testPassword() ? "Password is valid" : "Password is invalid");

