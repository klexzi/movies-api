import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import methodOverride from "method-override";

import { errorHandler } from "./middlewares/error-handler";
import apiRoutes from "./routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(methodOverride());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * initialize all routes
 */
app.use("/api", apiRoutes);
app.use(errorHandler);
export default app;
