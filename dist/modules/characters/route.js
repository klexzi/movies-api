"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _logger = _interopRequireDefault(require("../../config/logger"));

var _controller = require("./controller/");

var _validateQuery = require("./validations/validate-query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var charactersRoutes = _express["default"].Router();

charactersRoutes.get("/", _validateQuery.validateQuery, _controller.listCharacters);
var _default = charactersRoutes;
exports["default"] = _default;
charactersRoutes.use(function (error, req, res) {
  _logger["default"].debug(error);

  return res.status(404).json({
    error: "endpoint not found",
    message: error.message,
    status: _httpStatus["default"].NOT_FOUND
  });
});