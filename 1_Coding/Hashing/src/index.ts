import { Server } from "./models/Server";
import { newLineRouter } from "./routes/addLine";

const server = new Server();
server.addRoute(newLineRouter);
server.start(3000);
