import { Server } from "./models/Server";
import { Logger } from "./models/Logger";
import { newLineRouter } from "./routes/addLine";

const logger = Logger.getInstance();
const server = new Server();
server.addRoute(newLineRouter);

try {
    server.start(3000);
} catch (error) {
    logger.fatal("We could not start HTTP server");
}
