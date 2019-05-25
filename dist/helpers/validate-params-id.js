"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParamsId = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _httpStatus = _interopRequireDefault(require("http-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {object} params
 */
var _validationSchema = function _validationSchema(params) {
  var schema = {
    id: _joi["default"].number().integer().required()
  };
  return _joi["default"].validate(params, schema);
};

var validateParamsId = function validateParamsId(req, res, next) {
  var _validationSchema2 = _validationSchema(req.params),
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

exports.validateParamsId = validateParamsId;