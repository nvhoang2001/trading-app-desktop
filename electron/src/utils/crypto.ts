import crypto from "crypto";

export function encodeData(data: string, key: string, iv: string) {
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encryptedData = Buffer.concat([cipher.update(data), cipher.final()]);

    return encryptedData.toString("hex");
}

export function decodeData(encodedData: string, key: string, iv: string) {
    const decipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encryptedText = Buffer.from(encodedData, "hex");
    const encryptedData = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);

    return encryptedData.toString();
}

export function get256HashString(text: string) {
    const hash = crypto.createHash("sha256").update(text).digest("hex");
    return hash;
}
