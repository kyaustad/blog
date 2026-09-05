import { env } from "@/env";
import { generateSecret } from "otplib"
import QRCode from "qrcode";

const secret = generateSecret();
const issuer = "Kyle's Blog Admin"
const account = env.ADMIN_EMAIL;

const otpAuthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${encodeURIComponent(secret)}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;

QRCode.toString(otpAuthUrl,{type:'terminal'}, function (err, url) {
    console.log(url)
  })

console.log("Secret: ", secret)