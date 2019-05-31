import status from "http-status";

import logger from "../config/logger";
import Cache from "../config/cache";
import { getCharacters } from "../helpers/characters";
import { returnErrorType } from "../helpers/utils";
export const listCharacters = async (req, res, next) => {
  try {
    let cache = new Cache();
    let characters = await cache.get(req.originalUrl, async () => {
      let options = {
        filterBy: "gender",
        filterValue: req.query.gender,
        sortBy: req.query.sortBy,
        order: req.query.order || "asc"
      };

      return await getCharacters(req.params.movieId, options);
    });

    // close cache connection
    cache.close();
    return res.status(200).json({ ...characters, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return returnErrorType(error, next);
  }
};
