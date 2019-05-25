"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listMovies = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var _model = require("../model");

var _logger = _interopRequireDefault(require("../../../config/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var listMovies =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var movies, movieLists;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            movies = new _model.Movie();
            _context.next = 4;
            return movies.list();

          case 4:
            movieLists = _context.sent;
            return _context.abrupt("return", res.status(200).json(_objectSpread({}, movieLists, {
              status: _httpStatus["default"].OK
            })));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

            _logger["default"].error(_context.t0);

            return _context.abrupt("return", res.status(500).json({
              error: "internal server error",
              message: _context.t0.message,
              status: _httpStatus["default"].INTERNAL_SERVER_ERROR
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function listMovies(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.listMovies = listMovies;