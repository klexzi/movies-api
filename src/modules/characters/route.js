import express from "express";
import status from "http-status";

import logger from "../../config/logger";
import { listCharacters } from "./controller/";
import { validateQuery } from "./validations/validate-query";

const charactersRoutes = express.Router();
charactersRoutes.get("/", validateQuery, listCharacters);
export default charactersRoutes;
charactersRoutes.use((error, req, res) => {
  logger.debug(error);
  return res.status(404).json({
    error: "endpoint not found",
    message: error.message,
    status: status.NOT_FOUND
  });
});
