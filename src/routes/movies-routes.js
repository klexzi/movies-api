import express from "express";

import {
  listMovies,
  listCharacters,
  createComment,
  movieComments
} from "../controllers";
import { NotFoundError } from "../helpers/error-classes";
import { validateQuery } from "../validations/validate-query";
import { validateCreateComment } from "../validations/validate-create-comment";
import { validateParamsId } from "../validations/validate-params-id";

const movieRoutes = express.Router();
movieRoutes.get("/", listMovies);
movieRoutes.get(
  "/:movieId/characters",
  validateParamsId,
  validateQuery,
  listCharacters
);
movieRoutes.get("/:movieId/comments", validateParamsId, movieComments);
movieRoutes.post(
  "/:movieId/comments",
  validateParamsId,
  validateCreateComment,
  createComment
);
export default movieRoutes;
movieRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});
