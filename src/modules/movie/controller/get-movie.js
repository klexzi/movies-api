import status from "http-status";

import { Movie } from "../model";
import logger from "../../../config/logger";

export const getMovie = async (req, res) => {
  try {
    let movies = new Movie();
    let movie = await movies.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        error: "no record found with the given id",
        message: "movie not found",
        status: status.NOT_FOUND
      });
    }
    return res
      .status(200)
      .json({ error: null, result: movie, status: status.OK });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "internal server error",
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
