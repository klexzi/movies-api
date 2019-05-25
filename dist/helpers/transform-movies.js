"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformMovieData = void 0;

var _model = _interopRequireDefault(require("../modules/comments/model/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *
 * @param {number} movieId
 * @private
 */
var _countComments =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(movieId) {
    var commentCount;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _model["default"].count({
              where: {
                mid: movieId
              }
            });

          case 2:
            commentCount = _context.sent;
            return _context.abrupt("return", commentCount);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function _countComments(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 *
 * @param {array} movies
 * @private
 */


var _sortByReleaseDate = function _sortByReleaseDate(movies) {
  return movies.results.sort(function (a, b) {
    return new Date(a.release_date) - new Date(b.release_date);
  });
};
/**
 *
 * @param {array || object} movies
 * @private
 */


var _pickFields = function _pickFields(movies) {
  if (Array.isArray(movies)) {
    var id = 1;
    var promises = movies.map(
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(movie) {
        var title, opening_crawl, release_date, commentsCount;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                title = movie.title, opening_crawl = movie.opening_crawl, release_date = movie.release_date;
                _context2.next = 3;
                return _countComments(id++);

              case 3:
                commentsCount = _context2.sent;
                return _context2.abrupt("return", {
                  title: title,
                  opening_crawl: opening_crawl,
                  release_date: release_date,
                  id: id++,
                  commentsCount: commentsCount
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }()); // eslint-disable-next-line no-undef

    return Promise.all(promises);
  } else {
    var title = movies.title,
        opening_crawl = movies.opening_crawl,
        release_date = movies.release_date;
    return {
      title: title,
      opening_crawl: opening_crawl,
      release_date: release_date
    };
  }
};
/**
 *
 * @param {array || object} movies
 * @private
 */


var _formatResult = function _formatResult(movies) {
  if (Array.isArray(movies)) {
    return {
      results: movies,
      total: movies.length
    };
  }

  return movies;
};
/**
 *
 * @param {array} movies
 * @public
 */


var transformMovieData =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(movies) {
    var moviesResult;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            moviesResult = movies;

            if (Array.isArray(movies.results)) {
              moviesResult = _sortByReleaseDate(movies);
            }

            _context3.next = 4;
            return _pickFields(moviesResult);

          case 4:
            moviesResult = _context3.sent;
            moviesResult = _formatResult(moviesResult);
            return _context3.abrupt("return", moviesResult);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function transformMovieData(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.transformMovieData = transformMovieData;