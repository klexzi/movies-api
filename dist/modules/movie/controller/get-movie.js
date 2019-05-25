"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMovie = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var _model = require("../model");

var _logger = _interopRequireDefault(require("../../../config/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getMovie =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var movies, movie;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            movies = new _model.Movie();
            _context.next = 4;
            return movies.findById(req.params.id);

          case 4:
            movie = _context.sent;

            if (movie) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: "not found",
              message: "no record found with the given id",
              status: _httpStatus["default"].NOT_FOUND
            }));

          case 7:
            return _context.abrupt("return", res.status(200).json({
              error: null,
              result: movie,
              status: _httpStatus["default"].OK
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);

            _logger["default"].error(_context.t0);

            return _context.abrupt("return", res.status(500).json({
              error: "internal server error",
              message: _context.t0.message,
              status: _httpStatus["default"].INTERNAL_SERVER_ERROR
            }));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function getMovie(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getMovie = getMovie;