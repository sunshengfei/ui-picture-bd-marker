'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Movement = function Movement(node) {
  var _this = this;

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var boundRect = arguments.length > 2 ? arguments[2] : undefined;
  var options = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, Movement);

  _defineProperty(this, "transform", function (offsetX, offsetY) {
    if (!_this.options.editable) return;
    var parentEl = _this.moveNode;
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
  });

  this.moveNode = node;
  this.type = type;
  this.boundRect = boundRect;
  this.options = options;
};

exports["default"] = Movement;