import status from "http-status";

import Comment from "../model";
import logger from "../../../config/logger";
import Cache from "../../../config/cache";

const ttl = 60; // cache for 60 seconds
const cache = new Cache(ttl);

export const movieComments = async (req, res) => {
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
    logger.error(error);
    return res.status(500).json({
      error: "internal server error",
      message: error.message,
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
