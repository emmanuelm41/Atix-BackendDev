import { FastifyRequest, RouteOptions } from "fastify";
import * as uuid from "uuid";

import { Logger } from "../models/Logger";
import { Line } from "../models/Line";

const lines: { hash: string; line: string }[] = [];

export const newLineRouter: RouteOptions = {
    method: "POST",
    url: "/",
    schema: {
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: "object",
                properties: {
                    response_code: { type: "number" },
                    response_message: { type: "string" },
                },
            },
        },
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request: FastifyRequest, reply: any) => {
        const __id = uuid.v1();
        Logger.getInstance().trace(`[${__id}] - New request rcv: ${JSON.stringify(request.body)}`);
    },
    handler: async (request: FastifyRequest, reply: any) => {
        const logger = Logger.getInstance();
        const body = JSON.stringify(request.body);

        if (!lines.length) {
            logger.trace(`[] - First line`);
            lines.push({ hash: "0", line: `0,${body},1` });
        } else {
            logger.trace(`[] - Creating new line from previos one!`);
            const { hash, nonce } = Line.getNew(lines[lines.length - 1].hash, body);
            lines.push({ hash, line: `${hash},${body},${nonce}` });
        }

        logger.trace(`Output file: ${lines}`);
        return { response_code: -1, response_message: "OK" };
    },
};
