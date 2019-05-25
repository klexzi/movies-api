"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _logger = _interopRequireDefault(require("../../config/logger"));

var _controller = require("./controller/");

var _validateCreateComment = require("./validations/validate-create-comment");

var _movieCommentList = require("./controller/movie-comment-list");

var _validateParamsId = require("../../helpers/validate-params-id");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentRoutes = _express["default"].Router();

commentRoutes.post("/", _validateCreateComment.validateCreateComment, _controller.createComment);
commentRoutes.get("/", _controller.commentList);
commentRoutes.get("/:id", _validateParamsId.validateParamsId, _controller.getComment);
commentRoutes.get("/movie-comments/:id", _validateParamsId.validateParamsId, _movieCommentList.movieComments);
commentRoutes["delete"]("/:id", _validateParamsId.validateParamsId, _controller.deleteComment);
var _default = commentRoutes;
exports["default"] = _default;
commentRoutes.use(function (error, req, res) {
  _logger["default"].debug(error);

  return res.status(404).json({
    error: "endpoint not found",
    message: error.message,
    status: _httpStatus["default"].NOT_FOUND
  });
});