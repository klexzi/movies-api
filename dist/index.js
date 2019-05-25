"use strict";

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _secrets = require("./config/secrets");

var _logger = _interopRequireDefault(require("./config/logger"));

var _apiRoutes = _interopRequireDefault(require("./config/api-routes"));

var _database = _interopRequireDefault(require("./config/database"));

var _model = _interopRequireDefault(require("./modules/comments/model/"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use((0, _compression["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
/**
 * initialize all routes
 */

app.use("/api", _apiRoutes["default"]);

_database["default"].authenticate().then(function () {
  _logger["default"].debug("connected to db successfully");

  _model["default"].sync({
    force: false
  });

  app.listen(_secrets.PORT, function () {
    _logger["default"].debug("now listening on port ".concat(_secrets.PORT));
  });
})["catch"](function (reason) {
  _logger["default"].debug("could not connect to db because " + reason.message);
});