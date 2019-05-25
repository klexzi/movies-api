import status from "http-status";

import Comment from "../model/";
import logger from "../../../config/logger";
import cache from "../../../config/cache";
import {
  ApplicationError,
  NotFoundError
} from "../../../helpers/error-classes";

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return next(new NotFoundError("comment not found"));
    }
    await comment.destroy();
    await cache.del(req.originalUrl);
    return res
      .status(200)
      .json({ status: status.OK, message: "resource deleted successfully" });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
