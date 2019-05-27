import requestIp from "request-ip";
import status from "http-status";

import logger from "../config/logger";
import { Comment } from "../models";
import cache from "../config/cache";
import { ApplicationError, NotFoundError } from "../helpers/error-classes";
import { getMovie } from "../helpers/movies";

export const createComment = async (req, res, next) => {
  try {
    const clientIp = requestIp.getClientIp(req);
    const { comment } = req.body;
    const { movieId } = req.params;
    const movie = await getMovie(movieId);
    if (!movie) {
      return next(new NotFoundError("movie not found"));
    }
    const commentData = await Comment.create({
      comment,
      ip: clientIp,
      mid: movieId
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
