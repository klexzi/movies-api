import status from "http-status";

import logger from "../../../config/logger";
import Comment from "../model/";
import cache from "../../../config/cache";
import {
  ApplicationError,
  NotFoundError
} from "../../../helpers/error-classes";

export const getComment = async (req, res, next) => {
  try {
    let comment = await cache.get(req.originalUrl, async () => {
      return await Comment.findOne({ where: { id: req.params.id } });
    });
    if (!comment) {
      return next(new NotFoundError("comment not found"));
    }
    return res.status(200).json({ result: comment, status: status.OK });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
