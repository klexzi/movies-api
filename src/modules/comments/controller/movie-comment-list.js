import status from "http-status";

import Comment from "../model";
import logger from "../../../config/logger";
import cache from "../../../config/cache";
import { ApplicationError } from "../../../helpers/error-classes";

export const movieComments = async (req, res, next) => {
  try {
    let comments = await cache.get(req.originalUrl, async () => {
      const comments = await Comment.findAll({
        order: [["createdAt"]],
        where: { mid: req.params.id }
      });
      return comments;
    });
    return res.status(200).json({ results: comments, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
