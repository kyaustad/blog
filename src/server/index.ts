"use server";

import argon2 from "argon2";
import { env } from "@/env";
import * as jose from "jose";

type Response<T = null> = {
    success: boolean;
    message: string;
    data?: T
}

/* Helper function to verify the password using argon2 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
}

/* Helper function to generate a JWT token */
// export async function generateJWT()


// If login is successful move to TOTP/OTP verification before issuing the token
export async function login(email: string, password: string): Promise<Response<null>> {
    if (email !== env.ADMIN_EMAIL) {
        return {
            success: false,
            message: "Wrong Email Dumbass"
        }
    }
    const passwordValid = await verifyPassword(password, env.PASSWORD_HASH);

    if (!passwordValid) {
        return {
            success: false,
            message: "Wrong Password Cucky"
        }
    }

    return {
        success: true,
        message: "Login successful",
        data: null
    }


}

