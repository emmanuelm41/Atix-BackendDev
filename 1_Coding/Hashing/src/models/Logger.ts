import log4js from "log4js";

export class Logger {
    static logger: log4js.Logger;
    static getInstance(): log4js.Logger {
        if (!this.logger) {
            log4js.configure("./config/logger/log4js.configure");
            this.logger = log4js.getLogger("ATIX");
        }
        return this.logger;
    }
}
