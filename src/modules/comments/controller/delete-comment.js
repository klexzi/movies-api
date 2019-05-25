import status from "http-status";

import Comment from "../model/";
import logger from "../../../config/logger";
import Cache from "../../../config/cache";

const ttl = 0;
const cache = new Cache(ttl);

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ where: { id: req.params.id } });
    if (!comment) {
      return res
        .status(404)
        .json({
          error: "not found",
          message: "comment not found",
          status: status.NOT_FOUND
        });
    }
    await comment.destroy();
    await cache.del(req.originalUrl);
    return res
      .status(200)
      .json({ status: status.OK, message: "resource deleted successfully" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: "internal server error",
      message: error.message,
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
