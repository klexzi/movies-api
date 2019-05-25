"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComment = void 0;

var _requestIp = _interopRequireDefault(require("request-ip"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _logger = _interopRequireDefault(require("../../../config/logger"));

var _model = _interopRequireDefault(require("../model/"));

var _cache = _interopRequireDefault(require("../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createComment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var clientIp, _req$body, comment, mid, commentData;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            clientIp = _requestIp["default"].getClientIp(req);
            _req$body = req.body, comment = _req$body.comment, mid = _req$body.mid;
            _context.next = 5;
            return _model["default"].create({
              comment: comment,
              ip: clientIp,
              mid: mid
            });

          case 5:
            commentData = _context.sent;

            _cache["default"].flush();

            return _context.abrupt("return", res.status(200).json({
              error: null,
              message: "comment",
              result: commentData,
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

  return function createComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createComment = createComment;