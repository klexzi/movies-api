"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _route = _interopRequireDefault(require("../modules/movie/route"));

var _route2 = _interopRequireDefault(require("../modules/characters/route"));

var _route3 = _interopRequireDefault(require("../modules/comments/route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRoutes = _express["default"].Router();

apiRoutes.use("/movies", _route["default"]);
apiRoutes.use("/characters", _route2["default"]);
apiRoutes.use("/comments", _route3["default"]); //invalid endpoint request

apiRoutes.use(function (req, res) {
  return res.status(404).json({
    error: "endpoint not found",
    message: "endpoint not found",
    status: _httpStatus["default"].NOT_FOUND
  });
});
var _default = apiRoutes;
exports["default"] = _default;