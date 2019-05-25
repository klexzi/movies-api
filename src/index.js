import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import methodOverride from "method-override";

import { errorHandler } from "./middlewares/error-handler";
import { PORT } from "./config/secrets";
import logger from "./config/logger";
import apiRoutes from "./config/api-routes";
import sequelize from "./config/database";
import Comment from "./modules/comments/model/";

const app = express();

app.use(helmet());
app.use(cors());
app.use(methodOverride());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler());
/**
 * initialize all routes
 */
app.use("/api", apiRoutes);
sequelize
  .authenticate()
  .then(() => {
    logger.debug("connected to db successfully");
    Comment.sync({ force: false });
    app.listen(PORT, () => {
      logger.debug(`now listening on port ${PORT}`);
    });
  })
  .catch(reason => {
    logger.debug("could not connect to db because " + reason.message);
  });
