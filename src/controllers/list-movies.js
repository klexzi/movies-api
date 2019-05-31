import status from "http-status";

import logger from "../config/logger";
import { getMovies } from "../helpers/movies";
import Cache from "../config/cache";
import { returnErrorType } from "../helpers/utils";
export const listMovies = async (req, res, next) => {
  try {
    let cache = new Cache();
    let key = req.originalUrl || req.url;
    let movieLists = await cache.get(key, async () => {
      return await getMovies();
    });
    // close cache connection
    cache.close();
    return res.status(200).json({ ...movieLists, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return returnErrorType(error, next);
  }
};
