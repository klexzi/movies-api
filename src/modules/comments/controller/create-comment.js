import requestIp from "request-ip";
import status from "http-status";

import logger from "../../../config/logger";
import Comment from "../model/";
import cache from "../../../config/cache";

export const createComment = async (req, res) => {
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
      message: "comment",
      result: commentData,
      status: status.OK
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: "internal server error",
      message: error.message,
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
