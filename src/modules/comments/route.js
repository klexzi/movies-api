import express from "express";

import {
  createComment,
  commentList,
  getComment,
  deleteComment
} from "./controller/";
import { validateCreateComment } from "./validations/validate-create-comment";
import { movieComments } from "./controller/movie-comment-list";
import { validateParamsId } from "../../helpers/validate-params-id";
import { NotFoundError } from "../../helpers/error-classes";

const commentRoutes = express.Router();
commentRoutes.post("/", validateCreateComment, createComment);
commentRoutes.get("/", commentList);
commentRoutes.get("/:id", validateParamsId, getComment);
commentRoutes.get("/movie-comments/:id", validateParamsId, movieComments);
commentRoutes.delete("/:id", validateParamsId, deleteComment);

export default commentRoutes;
commentRoutes.use((req, res, next) => {
  return next(new NotFoundError("endpoint not found"));
});
