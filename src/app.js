import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import methodOverride from "method-override";

import { errorHandler } from "./middlewares/error-handler";
import apiRoutes from "./routes";

// initialize express
const app = express();

// secure API by setting HTTP headers
app.use(helmet());
// enable cross origin resource sharing
app.use(cors());
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
app.use(methodOverride());
// gzip compression
app.use(compression());
// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * initialize all routes
 */
app.use("/api", apiRoutes);
// handle all errors
app.use(errorHandler);
export default app;
