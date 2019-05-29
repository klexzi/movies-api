import status from "http-status";

import { Comment } from "../models";
import logger from "../config/logger";
import Cache from "../config/cache";
import { ApplicationError } from "../helpers/error-classes";

export const movieComments = async (req, res, next) => {
  try {
    let cache = new Cache();
    let key = req.originalUrl || req.url;
    let comments = await cache.get(key, async () => {
      const comments = await Comment.findAll({
        order: [["createdAt"]],
        where: { mid: req.params.movieId }
      });
      return comments;
    });
    // close cache connection
    cache.close();
    return res
      .status(200)
      .json({ results: comments, status: status.OK, total: comments.length });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
