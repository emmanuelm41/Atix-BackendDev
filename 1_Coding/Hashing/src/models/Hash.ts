import crypto from "crypto";

export class Hash {
    static calculate(entry: string): string {
        return crypto.createHash("sha256").update(entry, "utf8").digest("hex").toString();
    }
}
