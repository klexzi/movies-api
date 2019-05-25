import status from "http-status";

import logger from "../../../config/logger";
import Comment from "../model/";
import cache from "../../../config/cache";

export const getComment = async (req, res) => {
  try {
    let comment = await cache.get(req.originalUrl, async () => {
      return await Comment.findOne({ where: { id: req.params.id } });
    });
    if (!comment) {
      return res.status(404).json({
        error: "not found",
        message: "comment not found",
        status: status.NOT_FOUND
      });
    }
    return res.status(200).json({ result: comment, status: status.OK });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: "internal server error",
      message: error.message,
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
