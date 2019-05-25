import express from "express";

import { listMovies, getMovie } from "./controller/";
import { validateParamsId } from "../../helpers/validate-params-id";
import { NotFoundError } from "../../helpers/error-classes";

const movieRoutes = express.Router();
movieRoutes.get("/", listMovies);
movieRoutes.get("/:id", validateParamsId, getMovie);
export default movieRoutes;
movieRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});
