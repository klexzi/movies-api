"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteComment = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var _model = _interopRequireDefault(require("../model/"));

var _logger = _interopRequireDefault(require("../../../config/logger"));

var _cache = _interopRequireDefault(require("../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteComment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var comment;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _model["default"].findOne({
              where: {
                id: req.params.id
              }
            });

          case 3:
            comment = _context.sent;

            if (comment) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: "not found",
              message: "comment not found",
              status: _httpStatus["default"].NOT_FOUND
            }));

          case 6:
            _context.next = 8;
            return comment.destroy();

          case 8:
            _context.next = 10;
            return _cache["default"].del(req.originalUrl);

          case 10:
            return _context.abrupt("return", res.status(200).json({
              status: _httpStatus["default"].OK,
              message: "resource deleted successfully"
            }));

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

            _logger["default"].error(_context.t0);

            return _context.abrupt("return", res.status(500).json({
              error: "internal server error",
              message: _context.t0.message,
              status: _httpStatus["default"].INTERNAL_SERVER_ERROR
            }));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function deleteComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;