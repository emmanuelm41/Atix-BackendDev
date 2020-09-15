import { FastifyRequest, RouteOptions } from "fastify";
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
        // E.g. check authentication
    },
    handler: async (request: FastifyRequest, reply: any) => {
        const body = JSON.stringify(request.body);
        if (!lines.length) lines.push({ hash: "0", line: `0,${body},1` });
        else {
            const { hash, nonce } = Line.getNew(lines[lines.length - 1].hash, body);
            lines.push({ hash, line: `${hash},${body},${nonce}` });
        }
        console.log(lines);
        return { response_code: -1, response_message: "OK" };
    },
};
