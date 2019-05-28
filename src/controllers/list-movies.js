import status from "http-status";

import logger from "../config/logger";
import { ApplicationError } from "../helpers/error-classes";
import { getMovies } from "../helpers/movies";
import Cache from "../config/cache";
export const listMovies = async (req, res, next) => {
  try {
    let cache = new Cache();
    let key = req.originalUrl || req.url;
    let movieLists = await cache.get(key, async () => {
      return await getMovies();
    });
    return res.status(200).json({ ...movieLists, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
