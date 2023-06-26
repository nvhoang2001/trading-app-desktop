import { decodeData, encodeData } from "./crypto";

export function encryptedFileData(data: string) {
    const iv = "b0b788dfbb144d9022c75374e6d9a92a";
    const encryptKey = "b85b1699019878e27a8f82e3661eba85";
    const encryptedContent = encodeData(data, encryptKey, iv);

    return encryptedContent;
}

export function decodeFileData(data: string) {
    const iv = "b0b788dfbb144d9022c75374e6d9a92a";
    const encryptKey = "b85b1699019878e27a8f82e3661eba85";
    const encryptedContent = decodeData(data, encryptKey, iv);

    return encryptedContent;
}
