import { ValidationError } from "../helpers/error-classes";
import logger from "../config/logger";

export const errorHandler = (err, req, res) => {
  if (err instanceof ValidationError) {
    logger.error(err.stack);
    return res.status(err.status).json({
      status: err.stack,
      message: err.message,
      error: err.error
    });
  }
};
