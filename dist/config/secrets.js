"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB_URL = exports.MYSQL_DATABASE = exports.MYSQL_PASSWORD = exports.MYSQL_USERNAME = exports.ENV = exports.PORT = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
exports.ENV = ENV;
var MYSQL_HOST = process.env.MYSQL_HOST;
var MYSQL_USERNAME = process.env.MYSQL_USERNAME;
exports.MYSQL_USERNAME = MYSQL_USERNAME;
var MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
exports.MYSQL_PASSWORD = MYSQL_PASSWORD;
var MYSQL_DATABASE = process.env.MYSQL_DATABASE;
exports.MYSQL_DATABASE = MYSQL_DATABASE;
var DB_URL = "mysql://".concat(MYSQL_USERNAME, ":").concat(MYSQL_PASSWORD, "@").concat(MYSQL_HOST, "/").concat(MYSQL_DATABASE, "?reconnect=true");
exports.DB_URL = DB_URL;