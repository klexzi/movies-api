import express from "express";
import bodyParser from "body-parser";
import compression from "compression";

import { PORT } from "./config/secrets";
import logger from "./config/logger";
import apiRoutes from "./config/api-routes";
import sequelize from "./config/database";
import Comment from "./modules/comments/model/";

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * initialize all routes
 */
app.use("/api", apiRoutes);
sequelize
  .authenticate()
  .then(() => {
    console.log("connected to db successfully");
    Comment.sync({ force: true });
    app.listen(PORT, () => {
      logger.debug(`now listening on port ${PORT}`);
    });
  })
  .catch(reason => {
    console.log("could not connect to db because " + reason.message);
  });
