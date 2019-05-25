"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _secrets = require("./secrets");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize["default"](_secrets.MYSQL_DATABASE, _secrets.MYSQL_USERNAME, _secrets.MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql",
  logging: _secrets.ENV === "production" ? false : console.log
});
var _default = sequelize;
exports["default"] = _default;