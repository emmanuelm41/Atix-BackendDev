import { Hash } from "./Hash";

export class Line {
    static getNew(prevLine: string, message: string): { hash: string; nonce: number } {
        let nonce = -1,
            hash = "";
        do {
            nonce++;
            hash = Hash.calculate(prevLine, message, nonce);
        } while (hash.substr(0, 2) !== "00");

        return { hash, nonce };
    }

    static checkIntegrity(prevLine: string, message: string, nonce: number): boolean {
        return Hash.calculate(prevLine, message, nonce).substr(0, 2) === "00";
    }
}
