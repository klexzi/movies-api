"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Movie = void 0;

var _axios = require("../../../config/axios");

var _logger = _interopRequireDefault(require("../../../config/logger"));

var _transformMovies = require("../../../helpers/transform-movies");

var _cache = _interopRequireDefault(require("../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Movie =
/*#__PURE__*/
function () {
  function Movie(id) {
    _classCallCheck(this, Movie);

    this.id = id;
  }

  _createClass(Movie, [{
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var key;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                key = "/movies";
                return _context2.abrupt("return", _cache["default"].get(key,
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  var movieRecords;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.prev = 0;
                          _context.next = 3;
                          return _axios.fetch.get("films");

                        case 3:
                          movieRecords = _context.sent;
                          _context.next = 10;
                          break;

                        case 6:
                          _context.prev = 6;
                          _context.t0 = _context["catch"](0);

                          _logger["default"].error(_context.t0);

                          return _context.abrupt("return", {
                            results: []
                          });

                        case 10:
                          movieRecords = movieRecords.data;
                          _context.next = 13;
                          return (0, _transformMovies.transformMovieData)(movieRecords);

                        case 13:
                          movieRecords = _context.sent;

                          _logger["default"].debug("movie records:", movieRecords);

                          console.log(movieRecords);
                          return _context.abrupt("return", movieRecords);

                        case 17:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[0, 6]]);
                }))));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var key;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                key = "findMovieById(".concat(id, ")");
                return _context4.abrupt("return", _cache["default"].get(key,
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  var movieRecord;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.prev = 0;
                          _context3.next = 3;
                          return _axios.fetch.get("films/".concat(id));

                        case 3:
                          movieRecord = _context3.sent;
                          _context3.next = 10;
                          break;

                        case 6:
                          _context3.prev = 6;
                          _context3.t0 = _context3["catch"](0);

                          _logger["default"].error(_context3.t0);

                          return _context3.abrupt("return", null);

                        case 10:
                          movieRecord = movieRecord.data;
                          movieRecord = (0, _transformMovies.transformMovieData)(movieRecord);
                          return _context3.abrupt("return", movieRecord);

                        case 13:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, null, [[0, 6]]);
                }))));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function findById(_x) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }]);

  return Movie;
}();

exports.Movie = Movie;