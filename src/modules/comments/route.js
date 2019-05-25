import express from "express";
import status from "http-status";

import logger from "../../config/logger";
import {
  createComment,
  commentList,
  getComment,
  deleteComment
} from "./controller/";
import { validateCreateComment } from "./validations/validate-create-comment";
import { movieComments } from "./controller/movie-comment-list";
import { validateParamsId } from "../../helpers/validate-params-id";

const commentRoutes = express.Router();
commentRoutes.post("/", validateCreateComment, createComment);
commentRoutes.get("/", commentList);
commentRoutes.get("/:id", validateParamsId, getComment);
commentRoutes.get("/movie-comments/:id", validateParamsId, movieComments);
commentRoutes.delete("/:id", validateParamsId, deleteComment);

export default commentRoutes;
commentRoutes.use((error, req, res) => {
  logger.debug(error);
  return res.status(404).json({
    error: "endpoint not found",
    message: error.message,
    status: status.NOT_FOUND
  });
});
