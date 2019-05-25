import requestIp from "request-ip";
import status from "http-status";

import logger from "../../../config/logger";
import Comment from "../model/";
import cache from "../../../config/cache";
import { ApplicationError } from "../../../helpers/error-classes";

export const createComment = async (req, res, next) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    const { comment, mid } = req.body;
    const commentData = await Comment.create({
      comment,
      ip: clientIp,
      mid
    });
    cache.flush();
    return res.status(200).json({
      error: null,
      message: "comment created successfully",
      result: commentData,
      status: status.OK
    });
  } catch (error) {
    logger.error(error.message);
    return next(new ApplicationError(error.message));
  }
};
