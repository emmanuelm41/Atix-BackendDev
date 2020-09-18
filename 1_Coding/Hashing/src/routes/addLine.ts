import { FastifyReply, FastifyRequest, RawRequestDefaultExpression, RawServerBase, RawServerDefault, RouteOptions } from "fastify";
import * as uuid from "uuid";

import { Logger } from "../models/Logger";
import { Line } from "../models/Line";

const context: { lastHash: string; lines: string[] } = {
    lastHash: "0000000000000000000000000000000000000000000000000000000000000000",
    lines: [],
};

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
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {
        const __id = uuid.v1();

        Logger.getInstance().trace(`[${__id}] - New request rcv: ${JSON.stringify(request.body)}`);
    },
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const logger = Logger.getInstance();
        const body = JSON.stringify(request.body);

        const prevHash = context.lastHash;
        const { hash, nonce } = Line.getNew(prevHash, body);

        context.lines.push(`${prevHash},${body},${nonce}`);
        context.lastHash = hash;

        reply.header("Access-Control-Allow-Origin", "*");

        logger.trace(`Output file: ${JSON.stringify(context)}`);
        return { response_code: -1, response_message: "OK" };
    },
};
