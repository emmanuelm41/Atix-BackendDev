import { Hash } from "./Hash";

export class Line {
    static getNew(prevLine: string, message: string): string {
        let nonce = -1,
            newLine = "";
        do {
            nonce++;
            newLine = Hash.calculate(prevLine, message, nonce);
        } while (newLine.substr(0, 2) !== "00");

        return newLine;
    }

    static checkIntegrity(prevLine: string, message: string, nonce: number): boolean {
        return Hash.calculate(prevLine, message, nonce).substr(0, 2) === "00";
    }
}
