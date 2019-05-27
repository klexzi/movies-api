import status from "http-status";

import logger from "../config/logger";
import { ApplicationError } from "../helpers/error-classes";
import { getMovies } from "../helpers/movies";

export const listMovies = async (req, res, next) => {
  try {
    let movieLists = await getMovies();
    return res.status(200).json({ ...movieLists, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
