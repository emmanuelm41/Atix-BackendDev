import fastify from "fastify";
import { FastifyRequest } from "fastify";
import { Line } from "../Line";

const lines: { hash: string; line: string }[] = [];

export const newLineRouter = {
    method: "POST",
    url: "/",
    schema: {
        // request needs to have a querystring with a `name` parameter
        querystring: {
            name: { type: "string" },
        },
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: "object",
                properties: {
                    hello: { type: "string" },
                },
            },
        },
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request: FastifyRequest, reply: any) => {
        // E.g. check authentication
    },
    handler: async (request: FastifyRequest, reply: any) => {
        if (!lines.length) lines.push({ hash: "0", line: `0,${request.body},1` });
        else {
            const line = Line.getNew(lines[lines.length - 1].hash, request.body);
        }
    },
};
