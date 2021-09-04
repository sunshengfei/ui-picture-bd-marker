'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = require("./config");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Movement = function Movement(_node) {
  var _this = this;

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var boundRect = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, Movement);

  _defineProperty(this, "type", void 0);

  _defineProperty(this, "boundRect", void 0);

  _defineProperty(this, "updateData", function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _this.data = _objectSpread(_objectSpread({}, _this.data), data);
    var _this$data$uuid = _this.data.uuid,
        uuid = _this$data$uuid === void 0 ? null : _this$data$uuid;

    if (uuid) {
      _this.currentNode.dataset.uuid = uuid;
    }
  });

  _defineProperty(this, "fetchData", function () {
    _this.updateData({
      position: _this.coordinate()
    });
  });

  _defineProperty(this, "frame", function () {
    return _objectSpread({}, _this.boundRect);
  });

  _defineProperty(this, "transform", function (offsetX, offsetY) {
    if (!_this.options.editable) return;
    var parentEl = _this.currentNode;
    var rawHeightp = parseFloat(parentEl.style.height);
    var rawWidthp = parseFloat(parentEl.style.width);
    var rawTop = parseFloat(parentEl.style.top);
    var rawLeft = parseFloat(parentEl.style.left);
    var heightOffset = 100 * offsetY / _this.boundRect.height;
    var widthOffset = 100 * offsetX / _this.boundRect.width; // console.log( `this.type=${this.type},rawHeightp=${rawHeightp},rawWidthp=${rawWidthp},rawTop=${rawTop},rawLeft=${rawLeft},heightOffset=${heightOffset},widthOffset=${widthOffset}`);

    if (rawTop + heightOffset < _this.options.boundReachPercent || rawTop + heightOffset > 100 - _this.options.boundReachPercent) {
      return;
    }

    if (_this.type === 0) {
      //top
      if (rawHeightp - heightOffset < _this.options.boundReachPercent) {
        return;
      }

      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
    } else if (_this.type === 1) {
      //bottom
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
    } else if (_this.type === 2) {
      //left
      if (widthOffset + rawLeft < _this.options.boundReachPercent || widthOffset + rawLeft >= rawWidthp + rawLeft) {
        return;
      }

      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 3) {
      //right
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === 4) {
      //top-left
      if (rawHeightp - heightOffset < _this.options.boundReachPercent) {
        return;
      }

      if (rawWidthp - widthOffset < _this.options.boundReachPercent) {
        return;
      }

      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 5) {
      //top-right
      if (rawWidthp + widthOffset < _this.options.boundReachPercent) {
        return;
      }

      if (rawHeightp - heightOffset < _this.options.boundReachPercent) {
        return;
      }

      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === 6) {
      //bottom-left
      if (rawHeightp + heightOffset < _this.options.boundReachPercent) {
        return;
      }

      if (rawWidthp - widthOffset < _this.options.boundReachPercent) {
        return;
      }

      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 7) {
      //bottom-right
      if (rawHeightp + heightOffset < _this.options.boundReachPercent) {
        return;
      }

      if (rawWidthp + widthOffset < _this.options.boundReachPercent) {
        return;
      }

      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === -1) {
      // //move
      if (heightOffset + rawTop < _this.options.boundReachPercent || heightOffset + rawTop + rawHeightp > 100 - _this.options.boundReachPercent) {
        return;
      }

      if (widthOffset + rawLeft < _this.options.boundReachPercent || widthOffset + rawLeft + rawWidthp > 100 - _this.options.boundReachPercent) {
        return;
      }

      parentEl.style.top = (heightOffset + rawTop).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
    }

    _this.fetchData();
  });

  _defineProperty(this, "coordinate", function () {
    var node = _this.currentNode;
    var position = {
      x: node.style.left,
      y: node.style.top,
      x1: (parseFloat(node.style.width) + parseFloat(node.style.left)).toFixed(3) + '%',
      y1: (parseFloat(node.style.height) + parseFloat(node.style.top)).toFixed(3) + '%'
    };
    return position;
  });

  _defineProperty(this, "updateTag", function (tagOb) {
    var nTag = {};

    if (typeof tagOb === 'string') {
      nTag = {
        tag: tagOb,
        tagName: tagOb
      };
    }

    if (_typeof(tagOb) === 'object') {
      nTag = _objectSpread({}, tagOb);
    }

    _this.data = _objectSpread(_objectSpread({}, _this.data), nTag);
    return nTag;
  });

  this.currentNode = _node;
  this.type = type;
  this.boundRect = boundRect || {};
  this.options = options;
  var temData = Movement.tagTemplate();
  this.updateData(_objectSpread({}, temData));
  this.fetchData();
};

exports["default"] = Movement;

_defineProperty(Movement, "tagTemplate", function (tagName, tagIdstr, uuid) {
  var uu = "".concat((0, _config.UUID)(16, 16));
  var tagString = '请选择或添加新标签';
  var tagId = "temp@".concat(uu);
  return {
    uuid: uuid || uu,
    tag: tagIdstr || tagId,
    tagName: tagName || tagString
  };
});

_defineProperty(Movement, "dataTemplate", function (tag, x, y, x1, y1) {
  if (!tag || !/^.+$/gi.test(tag)) {
    tag = {
      tag: "temp@".concat(new Date().getTime())
    };
  }

  return _objectSpread(_objectSpread({}, tag), {}, {
    position: {
      x: x,
      y: y,
      x1: x1,
      y1: y1
    }
  });
});