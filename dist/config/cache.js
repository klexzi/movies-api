"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodeCache = _interopRequireDefault(require("node-cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cache =
/*#__PURE__*/
function () {
  function Cache(ttlSeconds) {
    _classCallCheck(this, Cache);

    this.cache = new _nodeCache["default"]({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
  }

  _createClass(Cache, [{
    key: "get",
    value: function get(key, storeFunction) {
      var _this = this;

      var value = this.cache.get(key);

      if (value) {
        return Promise.resolve(value);
      }

      return storeFunction().then(function (result) {
        _this.cache.set(key, result);

        return result;
      });
    }
  }, {
    key: "del",
    value: function del(keys) {
      this.cache.del(keys);
    }
  }, {
    key: "delStartWith",
    value: function delStartWith() {
      var startStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      if (!startStr) {
        return;
      }

      var keys = this.cache.keys();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (key.indexOf(startStr) === 0) {
            this.del(key);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "flush",
    value: function flush() {
      this.cache.flushAll();
    }
  }]);

  return Cache;
}();

var cache = new Cache(60 * 60 * 1);
var _default = cache;
exports["default"] = _default;