import status from "http-status";

import { Movie } from "../model";
import logger from "../../../config/logger";

export const listMovies = async (req, res) => {
  try {
    let movies = new Movie();
    let movieLists = await movies.list();
    return res.status(200).json({ ...movieLists, status: status.OK });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: "internal server error",
      message: error.message,
      status: status.INTERNAL_SERVER_ERROR
    });
  }
};
