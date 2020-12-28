"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productScheme = new _mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  imgURL: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Product', productScheme);

exports["default"] = _default;