"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Character = void 0;

var _axios = require("../../../config/axios");

var _logger = _interopRequireDefault(require("../../../config/logger"));

var _utils = require("../../../helpers/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Character =
/*#__PURE__*/
function () {
  function Character() {
    _classCallCheck(this, Character);

    this.data = {};
  }

  _createClass(Character, [{
    key: "list",
    value: function () {
      var _list = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _axios.fetch.get("people").then(function (response) {
                  return {
                    results: response.data.results
                  };
                })["catch"](function (reason) {
                  _logger["default"].error(reason);

                  var defaultRes = {
                    results: []
                  };
                  return new Query(defaultRes);
                });

              case 2:
                this.data = _context.sent;
                this.data.meta_data = (0, _utils.getCharacterMeta)(this.data.results);
                return _context.abrupt("return", new Query(this.data));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
  }]);

  return Character;
}();

exports.Character = Character;

var Query =
/*#__PURE__*/
function () {
  /**
   *
   * @param {object} data
   */
  function Query(data) {
    _classCallCheck(this, Query);

    this.data = data;
    this.value = this.data;
  }

  _createClass(Query, [{
    key: "sort",

    /**
     *
     * @param {string} sortBy
     * @param {string} order
     */
    value: function sort(sortBy) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "asc";
      this.value.results = this.data.results.sort(function (a, b) {
        var valA = isNaN(+a[sortBy]) ? a[sortBy].toLowerCase() : +a[sortBy];
        var valB = isNaN(+b[sortBy]) ? b[sortBy].toLowerCase() : +b[sortBy];

        if (order === "desc") {
          if (valA > valB) return -1;
          if (valA < valB) return 1;
          return 0;
        } else {
          if (valA < valB) return -1;
          if (valA > valB) return 1;
          return 0;
        }
      });
      this.value.meta_data = (0, _utils.getCharacterMeta)(this.value.results);
      return this;
    }
    /**
     *
     * @param {string} filterBy
     * @param {string} filterValue
     */

  }, {
    key: "filter",
    value: function filter(filterBy, filterValue) {
      this.value.results = this.data.results.filter(function (result) {
        return result[filterBy] === filterValue;
      });
      this.value.meta_data = (0, _utils.getCharacterMeta)(this.value.results);
      return this;
    }
  }, {
    key: "val",
    get: function get() {
      return this.value;
    }
  }]);

  return Query;
}();