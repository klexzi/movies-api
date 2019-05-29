import requestIp from "request-ip";
import status from "http-status";

import logger from "../config/logger";
import { Comment } from "../models";
import Cache from "../config/cache";
import { ApplicationError, NotFoundError } from "../helpers/error-classes";
import { getMovie } from "../helpers/movies";

export const createComment = async (req, res, next) => {
  try {
    let cache = new Cache();
    let key = req.originalUrl || req.url;
    const clientIp = requestIp.getClientIp(req);
    const { comment } = req.body;
    const { movieId } = req.params;
    // check if a movie exist with the id passed
    const movie = await getMovie(movieId);
    if (!movie) {
      return next(new NotFoundError("movie not found"));
    }
    const commentBody = {
      comment,
      ip: clientIp,
      mid: movieId
    };
    const commentData = await Comment.create(commentBody);
    // remove necessary keys from cache
    cache.del(key);
    // also let movies list get updated data
    cache.del("/api/movies");
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
