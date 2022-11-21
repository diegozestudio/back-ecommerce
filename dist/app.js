"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();

// settings
app.set("port", process.env.PORT || 3000);

// middlewares
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());

// routes
app.get("/", function (req, res) {
  res.json({
    message: 'hola'
  });
});
var _default = app;
exports["default"] = _default;