import express from "express";

import logger from "../../config/logger";
import { listMovies, getMovie } from "./controller/";

const movieRoutes = express.Router();
movieRoutes.get("/", listMovies);
movieRoutes.get("/:id", getMovie);
export default movieRoutes;
movieRoutes.use((err, req, res, next) => {
  logger.debug(err);
  return res.status(404).json({
    error: err.message,
    message: "endpoint not found",
    statusCode: 404
  });
});
