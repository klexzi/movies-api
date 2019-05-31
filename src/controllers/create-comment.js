import requestIp from "request-ip";
import status from "http-status";

import logger from "../config/logger";
import { Comment } from "../models";
import Cache from "../config/cache";
import { getMovie } from "../helpers/movies";
import { returnErrorType } from "../helpers/utils";

export const createComment = async (req, res, next) => {
  try {
    let cache = new Cache();
    let key = req.originalUrl || req.url;
    const clientIp = requestIp.getClientIp(req);
    const { comment } = req.body;
    const { movieId } = req.params;
    // check if a movie exist with the id passed
    await getMovie(movieId);
    const commentBody = {
      comment,
      ip: clientIp,
      mid: movieId
    };
    const commentData = await Comment.create(commentBody);
    // remove necessary keys from cache
    cache.del(key);
    // also let movies list endpoint get updated data by removing it from cache
    cache.del("/api/movies");
    // close cache connection
    cache.close();
    return res.status(status.CREATED).json({
      error: null,
      message: "comment created successfully",
      result: commentData,
      status: status.CREATED
    });
  } catch (error) {
    logger.error(error.message);
    return returnErrorType(error, next);
  }
};
