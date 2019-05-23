import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";

import { PORT } from "./config/secrets";
import logger from "./config/logger";
import apiRoutes from "./config/api-routes";

dotenv.config();
const app = express();

app.set("port", PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * initialize all routes
 */
app.use("/api", apiRoutes);
app.listen(app.get("port"), () => {
  logger.debug(`now listening on port ${app.get("port")}`);
});
