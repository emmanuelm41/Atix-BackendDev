import crypto from "crypto";

export class Hash {
    static calculate(prevLine: string, message: string, nonce: number): string {
        return crypto.createHash("sha256").update(`${prevLine},${message},${nonce}`, "utf8").digest("hex").toString();
    }
}
