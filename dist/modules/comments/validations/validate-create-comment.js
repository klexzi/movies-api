"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateCreateComment = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _httpStatus = _interopRequireDefault(require("http-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {object} body
 */
var _validationSchema = function _validationSchema(body) {
  var schema = {
    comment: _joi["default"].string().max(500).required(),
    mid: _joi["default"].number().integer().min(1).max(7).required()
  };
  return _joi["default"].validate(body, schema);
};

var validateCreateComment = function validateCreateComment(req, res, next) {
  var _validationSchema2 = _validationSchema(req.body),
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

exports.validateCreateComment = validateCreateComment;