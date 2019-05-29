import { ApplicationError } from "../helpers/error-classes";
import logger from "../config/logger";

/**
 * Express error handling middleware.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let response = {
    status: err.status,
    message: err.message,
    error: err.error
  };
  /**
   * if the error is an application error
   * then we want the output to be displayed on the console
   * in production
   * else
   * only display on development console.
   */
  if (err instanceof ApplicationError) {
    logger.error(err.stack);
    response.message = "something as gone wrong";
  } else {
    logger.debug(err.stack);
  }
  return res.status(err.status).json(response);
};
