// Require the framework and instantiate it
import fastify, { FastifyInstance, RouteOptions } from "fastify";

export class Server {
    instance: FastifyInstance = fastify();

    constructor() {}

    start = async (port: number) => {
        try {
            await this.instance.listen(port);
            const address = this.instance.server.address();
            if (address) this.instance.log.info(`server listening on ${address}`);
        } catch (err) {
            this.instance.log.error(err);
            process.exit(1);
        }
    };

    addRoute(route: RouteOptions) {
        this.instance.route(route);
    }
}
