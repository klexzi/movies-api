import { Character } from "../model";
import logger from "../../../config/logger";
import cache from "../../../config/cache";
import { ApplicationError } from "../../../helpers/error-classes";

export const listCharacters = async (req, res, next) => {
  try {
    let character = new Character();
    let characterLists = cache.get(req.originalUrl, async () => {
      let characterData = await character.list();
      if (req.query.sortBy) {
        characterData = characterData.sort(req.query.sortBy, req.query.order);
      }
      if (req.query.gender) {
        characterData = characterData.filter("gender", req.query.gender);
      }
      return characterData.val;
    });
    characterLists = await characterLists;
    return res.status(200).json(characterLists);
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
