import status from "http-status";

import logger from "../config/logger";
import Cache from "../config/cache";
import { returnErrorType } from "../helpers/utils";

export const clearCache = async (req, res, next) => {
  try {
    let cache = new Cache();
    await cache.flush();
    return res.status(200).json({
      error: null,
      message: "cache flushed successfully",
      status: status.OK
    });
  } catch (error) {
    logger.error(error);
    return returnErrorType(error, next);
  }
};
