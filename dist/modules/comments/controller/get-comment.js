"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getComment = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var _logger = _interopRequireDefault(require("../../../config/logger"));

var _model = _interopRequireDefault(require("../model/"));

var _cache = _interopRequireDefault(require("../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getComment =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var comment;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _cache["default"].get(req.originalUrl,
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _model["default"].findOne({
                        where: {
                          id: req.params.id
                        }
                      });

                    case 2:
                      return _context.abrupt("return", _context.sent);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));

          case 3:
            comment = _context2.sent;

            if (comment) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              error: "not found",
              message: "comment not found",
              status: _httpStatus["default"].NOT_FOUND
            }));

          case 6:
            return _context2.abrupt("return", res.status(200).json({
              result: comment,
              status: _httpStatus["default"].OK
            }));

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);

            _logger["default"].error(_context2.t0);

            return _context2.abrupt("return", res.status(500).json({
              error: "internal server error",
              message: _context2.t0.message,
              status: _httpStatus["default"].INTERNAL_SERVER_ERROR
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function getComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getComment = getComment;