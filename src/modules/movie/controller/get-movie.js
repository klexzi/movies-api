import status from "http-status";

import { Movie } from "../model";
import logger from "../../../config/logger";
import {
  ApplicationError,
  NotFoundError
} from "../../../helpers/error-classes";

export const getMovie = async (req, res, next) => {
  try {
    let movies = new Movie();
    let movie = await movies.findById(req.params.id);
    if (!movie) {
      return next(new NotFoundError("movie not found"));
    }
    return res
      .status(200)
      .json({ error: null, result: movie, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
