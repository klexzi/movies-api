"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateQuery = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _httpStatus = _interopRequireDefault(require("http-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {object} queryParams
 */
var _validationSchema = function _validationSchema(queryParams) {
  var schema = {
    sortBy: _joi["default"].string().valid(["name", "gender", "height"]),
    order: _joi["default"].string().valid(["asc", "desc"]).when("sortBy", {
      is: _joi["default"].exist(),
      then: _joi["default"].required(),
      otherwise: _joi["default"].forbidden()
    }),
    gender: _joi["default"].string().valid(["male", "female", "n/a"])
  };
  return _joi["default"].validate(queryParams, schema);
};

var validateQuery = function validateQuery(req, res, next) {
  var _validationSchema2 = _validationSchema(req.query),
      error = _validationSchema2.error;

  if (error) {
    return res.status(400).json({
      error: "bad request",
      message: error.details[0].message,
      status: _httpStatus["default"].BAD_REQUEST
    });
  } else {
    return next();
  }
};

exports.validateQuery = validateQuery;