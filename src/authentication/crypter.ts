import crypto from "crypto";

const SECRET = "s0m3thLn95up3rsecre7";

export const random = () => crypto.randomBytes(128).toString("base64");
export function encryptPassword(salt: string, password: string): string {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex");
}
