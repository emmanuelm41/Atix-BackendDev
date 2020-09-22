import * as uuid from "uuid";

import { Line } from "./Line";
import { Source } from "./Source";
import { Logger } from "../models/Logger";

interface GenericObject {
    [key: string]: any;
}

class Worker {
    source: Source;
    isRunning: boolean = false;
    tasks: { id: string; payload: GenericObject }[] = [];
    events: { [key: string]: () => void } = {};

    constructor(interval: number) {
        this.source = new Source();

        setInterval(() => {
            const logger = Logger.getInstance();

            if (!this.isRunning) {
                while (this.tasks.length) {
                    const { id, payload } = this.tasks.shift() || {};

                    if (id && payload) {
                        logger.trace(`[${id}] - Starting task`);
                        this.runTask(id, payload);
                        logger.trace(`[${id}] - Task finished`);

                        this.trigger(id);
                    }
                }
            }
        }, interval);
    }

    runTask(id: string, payload: GenericObject) {
        const logger = Logger.getInstance();
        const body = JSON.stringify(payload);

        const prevHash = this.source.lastHash;
        const { hash, nonce } = Line.getNew(prevHash, body);
        const newLine = `${prevHash},${body},${nonce}`;

        this.source.appendNewLine(hash, newLine);

        return newLine;
    }

    addTask(payload: GenericObject) {
        const logger = Logger.getInstance();
        const id = uuid.v1();
        logger.trace(`[${id}] - Adding new task to the queue`);

        this.tasks.push({ id, payload });

        return id;
    }

    trigger(id: string) {
        if (this.events[id]) {
            this.events[id]();
            delete this.events[id];
        }
    }

    on(id: string, callback: () => void) {
        this.events[id] = callback;
    }
}

export class WorkerInstance {
    static instance: Worker;

    static getInstance() {
        if (!this.instance) this.instance = new Worker(100);
        return this.instance;
    }
}
