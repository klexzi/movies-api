import express from "express";

import logger from "../../config/logger";
import { listCharacters } from "./controller/";
import { validateQuery } from "./validations/validate-query";

const charactersRoutes = express.Router();
charactersRoutes.get("/", validateQuery, listCharacters);
// charactersRoutes.get("/:id", getMovie);
export default charactersRoutes;
charactersRoutes.use((err, req, res, next) => {
  logger.debug(err);
  return res.status(404).json({
    error: err.message,
    message: "endpoint not found",
    statusCode: 404
  });
});
