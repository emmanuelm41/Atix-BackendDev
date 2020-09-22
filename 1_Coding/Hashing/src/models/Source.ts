import fs from "fs";
import parseCsv from "csv-parse/lib/sync";

import { Logger } from "./Logger";

export class Source {
    lastHash: string;
    path: string = process.env.SOURCE_FILE_PATH || "./source/file.csv";

    constructor(forcedPath?: string) {
        const logger = Logger.getInstance();
        if (forcedPath) this.path = forcedPath;

        logger.info(`Reading initial csv file from ${this.path}`);

        if (!fs.existsSync(this.path)) {
            logger.warn(`The initial csv file was not found. Creating one!`);
            fs.writeFileSync(this.path, "");

            this.lastHash = "0000000000000000000000000000000000000000000000000000000000000000";
        } else {
            try {
                logger.warn(`The initial csv file was found. Loading it!`);

                const file = fs.readFileSync(this.path, "utf-8");
                const csv = parseCsv(file, { columns: false, quote: false });

                this.lastHash = csv[csv.length - 1][0] as string;
                logger.trace(`The las hash found is ${this.lastHash}`);
            } catch (error) {
                logger.error(`Error found while loading the initial csv file. ${error.toString()}`);
                process.exit(1);
            }
        }
    }

    appendNewLine(hash: string, line: string) {
        this.lastHash = hash;
        fs.appendFileSync(this.path, line + "\n", "utf-8");
    }
}
