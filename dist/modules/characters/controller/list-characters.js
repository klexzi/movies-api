"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listCharacters = void 0;

var _httpStatus = _interopRequireDefault(require("http-status"));

var _model = require("../model");

var _logger = _interopRequireDefault(require("../../../config/logger"));

var _cache = _interopRequireDefault(require("../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var listCharacters =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var character, characterLists;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            character = new _model.Character();
            characterLists = _cache["default"].get(req.originalUrl,
            /*#__PURE__*/
            _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee() {
              var characterData;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return character.list();

                    case 2:
                      characterData = _context.sent;

                      if (req.query.sortBy) {
                        characterData = characterData.sort(req.query.sortBy, req.query.order);
                      }

                      if (req.query.gender) {
                        characterData = characterData.filter("gender", req.query.gender);
                      }

                      return _context.abrupt("return", characterData.val);

                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
            _context2.next = 5;
            return characterLists;

          case 5:
            characterLists = _context2.sent;
            return _context2.abrupt("return", res.status(200).json(characterLists));

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

  return function listCharacters(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.listCharacters = listCharacters;