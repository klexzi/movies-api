import status from "http-status";

import logger from "../config/logger";
// import cache from "../config/cache";
import { ApplicationError, NotFoundError } from "../helpers/error-classes";
import { getCharacters } from "../helpers/characters";

export const listCharacters = async (req, res, next) => {
  try {
    // let character = new Character();
    // let characterLists = cache.get(req.originalUrl, async () => {
    let options = {
      filterBy: "gender",
      filterValue: req.query.gender,
      sortBy: req.query.sortBy,
      order: req.query.order || "asc"
    };

    let characters = await getCharacters(req.params.movieId, options);
    if (!characters) {
      return next(
        new NotFoundError("no characters found for the movie selected")
      );
    }
    return res.status(200).json({ ...characters, status: status.OK });

    // characterLists = await characterLists;
    // return res.status(200).json(characterLists);
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
