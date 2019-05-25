import express from "express";

import { listCharacters } from "./controller/";
import { validateQuery } from "./validations/validate-query";
import { NotFoundError } from "../../helpers/error-classes";

const charactersRoutes = express.Router();
charactersRoutes.get("/", validateQuery, listCharacters);
export default charactersRoutes;
charactersRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});
