"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../../../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Comment = _database["default"].define("comment", {
  id: {
    type: _sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  comment: {
    type: (0, _sequelize.STRING)({
      length: 500
    }),
    allowNull: false
  },
  ip: {
    type: _sequelize.STRING,
    allowNull: false
  },
  mid: {
    type: _sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

var _default = Comment;
exports["default"] = _default;