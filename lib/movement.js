

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Movement = function Movement(node) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

  var _this = this;

  var boundRect = arguments[2];
  var options = arguments[3];

  _classCallCheck(this, Movement);

  this.transform = function (offsetX, offsetY) {
    if (!_this.options.editable) return;
    var parentEl = _this.moveNode;
    var rawHeightp = parseFloat(parentEl.style.height);
    var rawWidthp = parseFloat(parentEl.style.width);
    var rawTop = parseFloat(parentEl.style.top);
    var rawLeft = parseFloat(parentEl.style.left);
    var heightOffset = 100 * offsetY / _this.boundRect.height;
    var widthOffset = 100 * offsetX / _this.boundRect.width;

    if (rawTop + heightOffset < _this.options.boundReachPercent || rawTop + heightOffset > 100 - _this.options.boundReachPercent) {
      return;
    }
    if (_this.type === 0) {
      if (rawHeightp - heightOffset < _this.options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
    } else if (_this.type === 1) {
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
    } else if (_this.type === 2) {
      if (widthOffset + rawLeft < _this.options.boundReachPercent || widthOffset + rawLeft >= rawWidthp + rawLeft) {
        return;
      }
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 3) {
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === 4) {
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
      if (rawHeightp + heightOffset < _this.options.boundReachPercent) {
        return;
      }
      if (rawWidthp + widthOffset < _this.options.boundReachPercent) {
        return;
      }
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === -1) {
      if (heightOffset + rawTop < _this.options.boundReachPercent || heightOffset + rawTop + rawHeightp > 100 - _this.options.boundReachPercent) {
        return;
      }
      if (widthOffset + rawLeft < _this.options.boundReachPercent || widthOffset + rawLeft + rawWidthp > 100 - _this.options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (heightOffset + rawTop).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
    }
  };

  this.moveNode = node;
  this.type = type;
  this.boundRect = boundRect;
  this.options = options;
};

exports.default = Movement;