import express from "express";
import status from "http-status";

import logger from "../../config/logger";
import { listMovies, getMovie } from "./controller/";

const movieRoutes = express.Router();
movieRoutes.get("/", listMovies);
movieRoutes.get("/:id", getMovie);
export default movieRoutes;
movieRoutes.use((error, req, res, next) => {
  logger.debug(error);
  return res.status(404).json({
    error: "endpoint not found",
    message: error.message,
    status: status.NOT_FOUND
  });
});
