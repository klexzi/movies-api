"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _logger = _interopRequireDefault(require("../../config/logger"));

var _controller = require("./controller/");

var _validateParamsId = require("../../helpers/validate-params-id");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var movieRoutes = _express["default"].Router();

movieRoutes.get("/", _controller.listMovies);
movieRoutes.get("/:id", _validateParamsId.validateParamsId, _controller.getMovie);
var _default = movieRoutes;
exports["default"] = _default;
movieRoutes.use(function (error, req, res) {
  _logger["default"].debug(error);

  return res.status(404).json({
    error: "not found",
    message: error.message,
    status: _httpStatus["default"].NOT_FOUND
  });
});