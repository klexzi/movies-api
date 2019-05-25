"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetch = _axios["default"].create({
  baseURL: "https://swapi.co/api/",
  timeout: 100000
});

exports.fetch = fetch;