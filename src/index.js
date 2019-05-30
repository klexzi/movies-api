/**
 * Module dependencies.
 */
import app from "./app";
import { PORT } from "./config/secrets";
import logger from "./config/logger";
import sequelize from "./config/database";
import { Comment } from "./models";
/**
 * check database connection before starting the app server.
 */
sequelize
  .authenticate()
  .then(() => {
    logger.info("connected to db successfully");
    Comment.sync({ force: false });
    app.listen(PORT, () => {
      logger.info(`now listening on port ${PORT}`);
    });
  })
  .catch(reason => {
    logger.info("could not connect to db because " + reason.message);
  });

/**
 * listen to unhandled promise rejection.
 */
process.on("unhandledRejection", reason => {
  logger.error("Unhandled Rejection at", reason.stack || reason);
  // can send the information to a crash reporting service like sentry.io here.
});
