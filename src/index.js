/**
 * Module dependencies.
 */
import app from "./app";
import { PORT } from "./config/secrets";
import logger from "./config/logger";
import sequelize from "./config/database";
import { Comment } from "./models";

sequelize
  .authenticate()
  .then(() => {
    logger.debug("connected to db successfully");
    Comment.sync({ force: false });
    app.listen(PORT, () => {
      logger.info(`now listening on port ${PORT}`);
    });
  })
  .catch(reason => {
    logger.debug("could not connect to db because " + reason.message);
  });
