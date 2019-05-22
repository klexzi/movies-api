import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";

import { PORT } from "./config/secrets";
import logger from "./config/logger";

dotenv.config();
const app = express();

app.set("port", PORT);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.listen(app.get("port"), () => {
  logger.debug(`now listening on port ${app.get("port")}`);
});
