"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = require("winston");

var timestamp = _winston.format.timestamp,
    combine = _winston.format.combine,
    prettyPrint = _winston.format.prettyPrint,
    label = _winston.format.label,
    colorize = _winston.format.colorize;
var logger = (0, _winston.createLogger)({
  transports: [new _winston.transports.Console({
    level: process.env.NODE_ENV === "production" ? "error" : "debug"
  }), new _winston.transports.File({
    filename: "errors.log",
    level: "error"
  })],
  exceptionHandlers: [new _winston.transports.File({
    filename: "exceptions.log"
  })],
  format: combine(label({
    label: "Log"
  }), timestamp(), prettyPrint(), colorize())
});
exports["default"] = logger;
logger.exitOnError = false;