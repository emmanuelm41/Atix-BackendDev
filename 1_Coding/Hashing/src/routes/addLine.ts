import { FastifyReply, FastifyRequest, RouteOptions } from "fastify";
import { Logger } from "../models/Logger";
import { WorkerInstance } from "../models/Worker";

const worker = WorkerInstance.getInstance();

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
    preHandler: async (request: FastifyRequest, reply: FastifyReply) => {},
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
        const logger = Logger.getInstance();
        const body = request.body as { [key: string]: any };

        reply.header("Access-Control-Allow-Origin", "*");

        const id = worker.addTask(body);
        worker.on(id, () => {
            logger.trace(`[${id}] - Sending response`);
            reply.status(200).send({ response_code: -1, response_message: "OK" });
        });
    },
};
