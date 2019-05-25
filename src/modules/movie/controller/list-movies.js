import status from "http-status";

import { Movie } from "../model";
import logger from "../../../config/logger";
import { ApplicationError } from "../../../helpers/error-classes";

export const listMovies = async (req, res, next) => {
  try {
    let movies = new Movie();
    let movieLists = await movies.list();
    return res.status(200).json({ ...movieLists, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
