import status from "http-status";

import { Character } from "../model";
import logger from "../../../config/logger";
import cache from "../../../config/cache";

export const listCharacters = async (req, res) => {
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
    logger.error(error);
    return res.status(500).json({
      error: "internal server error",
      message: error.message,
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
