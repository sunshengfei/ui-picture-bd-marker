'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UUID", {
  enumerable: true,
  get: function get() {
    return _config.UUID;
  }
});
Object.defineProperty(exports, "positionP2S", {
  enumerable: true,
  get: function get() {
    return _config.positionP2S;
  }
});
Object.defineProperty(exports, "transformDataArray", {
  enumerable: true,
  get: function get() {
    return _config.transformDataArray;
  }
});
Object.defineProperty(exports, "ResizeAnnotation", {
  enumerable: true,
  get: function get() {
    return _anno["default"];
  }
});
exports.BdAIMarker = void 0;

require("./compatible");

var _config = require("./config");

var _anno = _interopRequireDefault(require("./anno"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BdAIMarker = function BdAIMarker(layer, draft, resizeAnnotation) {
  var _this = this;

  var configs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, BdAIMarker);

  _defineProperty(this, "eventTargetOnTransform", false);

  _defineProperty(this, "$callback_handler", function (onTrans) {
    _this.eventTargetOnTransform = onTrans;
  });

  _defineProperty(this, "setConfigOptions", function (newOptions) {
    _this.options = _objectSpread(_objectSpread({}, _this.options), newOptions.options);

    if (_this.resizeAnnotation) {
      _this.resizeAnnotation.setConfigOptions(newOptions);
    }
  });

  _defineProperty(this, "_compatibalBoundRect", function () {
    var boundRect = _this.boundRect();

    if (typeof boundRect.x != 'undefined') return boundRect;
    return {
      x: boundRect.left,
      y: boundRect.top,
      left: boundRect.left,
      top: boundRect.top,
      right: boundRect.right,
      bottom: boundRect.bottom,
      width: boundRect.width,
      height: boundRect.height
    };
  });

  _defineProperty(this, "mouseEventHandler", function (e, clientX, clientY) {
    // e.preventDefault();
    // e.stopPropagation();
    var eventType = e.type;

    var boundRect = _this._compatibalBoundRect();

    if (clientX) {
      _this.moveX = clientX - boundRect.x;
    }

    if (clientY) {
      _this.moveY = clientY - boundRect.y;
    }

    if (eventType === _config.MOUSE_EVENT[6]) {
      _this.eventTargetOnTransform = false;
      _this.actionDown = false;

      _this.resizeAnnotation.dragEventOn(e);

      return;
    }

    if (_this.eventTargetOnTransform) {
      _this.resizeAnnotation.dragEventOn(e);

      return;
    }

    if (eventType === _config.MOUSE_EVENT[0] || eventType === _config.TOUCH_EVENT[0]) {
      if (e.target.classList.contains(_this.options.annotationClass) || e.target.classList.contains("".concat(_config.PREFIX_RESIZE_DOT))) {
        _this.eventTargetOnTransform = true;

        _this.resizeAnnotation.dragEventOn(e);

        return;
      }

      if (_this.actionDown) {
        _this.dragTo(_this.moveX, _this.moveY);

        return;
      }

      _this.resizeAnnotation.removeSelectedAnnotation();

      _this.actionDown = true;
      _this.anchorX = _this.moveX;
      _this.anchorY = _this.moveY;

      _this.resetDraft();

      _this.anchorAt(_this.anchorX, _this.anchorY);
    } else if (eventType === _config.MOUSE_EVENT[1] || eventType === _config.TOUCH_EVENT[1]) {
      if (_this.actionDown) {
        _this.dragTo(_this.moveX, _this.moveY);
      }
    } else if (eventType === _config.MOUSE_EVENT[4] || eventType === _config.TOUCH_EVENT[2] || eventType === _config.TOUCH_EVENT[4]) {
      if (_this.actionDown && _this.resizeAnnotation) {
        _this.resizeAnnotation.drawAnnotation(_this.draftRect);

        _this.resetDraft();
      }

      _this.actionDown = false;
    } else {
      if (_this.actionDown && _this.filterOutOfBounds(_this.moveX, _this.moveY)) {
        // console.log(`eventType=${eventType}`);
        // console.log(this.draftRect);
        if (_this.resizeAnnotation) {
          _this.resizeAnnotation.drawAnnotation(_this.draftRect);

          _this.resetDraft();
        }

        _this.actionDown = false;
      }
    } // console.log(`eventType=${eventType}`);

  });

  _defineProperty(this, "anchorAt", function (x, y) {
    if (!_this.options.editable) return;

    var ccRect = _this._compatibalBoundRect();

    _this.draft.style.display = '';

    if (_this.moveX < x) {
      _this.draft.style.right = 100 * Math.abs(ccRect.width - x) / ccRect.width + '%';
      _this.draft.style.left = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        x: (100 * Math.abs(_this.moveX) / ccRect.width).toFixed(3) + '%'
      });
    } else {
      _this.draft.style.left = (100 * Math.abs(x) / ccRect.width).toFixed(3) + '%';
      _this.draft.style.right = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        x: (100 * Math.abs(x) / ccRect.width).toFixed(3) + '%'
      });
    }

    if (_this.moveY < y) {
      _this.draft.style.bottom = (100 * Math.abs(ccRect.height - y) / ccRect.height).toFixed(3) + '%';
      _this.draft.style.top = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        y: (100 * Math.abs(_this.moveY) / ccRect.height).toFixed(3) + '%'
      });
    } else {
      _this.draft.style.top = (100 * Math.abs(y) / ccRect.height).toFixed(3) + '%';
      _this.draft.style.bottom = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        y: (100 * Math.abs(y) / ccRect.height).toFixed(3) + '%'
      });
    }
  });

  _defineProperty(this, "filterOutOfBounds", function (x, y) {
    return x >= _this._compatibalBoundRect().width || // x >= this._compatibalBoundRect().x + this._compatibalBoundRect().width + 2 ||
    y >= _this._compatibalBoundRect().height || // y >= this._compatibalBoundRect().y + this._compatibalBoundRect().height + 2 ||
    x < 1 || y < 1;
  });

  _defineProperty(this, "resetDraft", function () {
    //reset
    _this.draftRect = {
      x: -1,
      y: -1,
      width: 0,
      height: 0
    };
    _this.draft.style.width = '0%';
    _this.draft.style.height = '0%';
  });

  _defineProperty(this, "clearAll", function () {
    var annotations = _this.layer.querySelectorAll(".".concat(_this.options.annotationClass));

    annotations.forEach(function (item) {
      item.remove();
    });

    _this.renderData(void 0);
  });

  _defineProperty(this, "dragTo", function (x, y) {
    if (!_this.options.editable) return;

    if (_this.filterOutOfBounds(x, y)) {
      _this.actionDown = false;
    }

    _this.anchorAt(_this.anchorX, _this.anchorY);

    var widthRatio = (100 * Math.abs(x - _this.anchorX) / _this._compatibalBoundRect().width).toFixed(3);

    var heightRatio = (100 * Math.abs(y - _this.anchorY) / _this._compatibalBoundRect().height).toFixed(3);

    _this.draftRect = Object.assign(_this.draftRect, {
      width: widthRatio + '%',
      height: heightRatio + '%'
    });
    _this.draft.style.width = _this.draftRect.width;
    _this.draft.style.height = _this.draftRect.height;
  });

  _defineProperty(this, "renderData", function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments.length > 1 ? arguments[1] : undefined;
    var ra = _this.resizeAnnotation;

    if (ra) {
      ra.renderData(dataArray, base);
    }
  });

  _defineProperty(this, "setTag", function (tag) {
    if (_this.resizeAnnotation && tag) {
      _this.resizeAnnotation.setTagForCurrentMovement(tag);
    }
  });

  _defineProperty(this, "selectMarkerByTagId", function (tagId) {
    if (tagId) {
      _this.resizeAnnotation.selectMarkerByTagId(tagId);
    }
  });

  _defineProperty(this, "dataSource", function () {
    if (_this.resizeAnnotation) {
      return _this.resizeAnnotation.dataSource();
    }

    return void 0;
  });

  _defineProperty(this, "dataForTag", function (tagId, uuid) {
    return _this.resizeAnnotation.dataSourceOfTag(tagId, uuid);
  });

  if (_typeof(configs) !== 'object') {
    throw new Error('Please provide a callback Config for BdAIMarker');
  }

  this.options = _objectSpread(_objectSpread({}, _config.defaultConfig.options), configs.options);

  if (layer) {
    this.layer = layer;
    this.draft = draft;
    this.actionDown = false;
    this.draftRect = {};
    this.anchorX = -1;
    this.anchorY = -1;

    this.boundRect = function () {
      return layer.getBoundingClientRect();
    };

    this.resizeAnnotation = resizeAnnotation ? resizeAnnotation : new _anno["default"](draft.parentNode, this._compatibalBoundRect, configs, this.$callback_handler);
    var self = this;

    if (this.options.deviceType == 'both' || this.options.deviceType == 'mouse') {
      _config.MOUSE_EVENT.forEach(function (currentValue, index, arr) {
        layer.addEventListener(currentValue, function (e) {
          if (_this.options.deviceType == 'touch') {
            return;
          }

          var x = e.clientX,
              y = e.clientY;
          self.mouseEventHandler(e, x, y);
        }, true);
      });
    }

    if (this.options.deviceType == 'both' || this.options.deviceType == 'touch') {
      _config.TOUCH_EVENT.forEach(function (currentValue, index, arr) {
        layer.addEventListener(currentValue, function (e) {
          if (_this.options.deviceType == 'mouse') {
            return;
          }

          if (e.targetTouches) {
            var touch = e.targetTouches[0];
            var x = touch ? touch.clientX : undefined,
                y = touch ? touch.clientY : undefined;
            self.mouseEventHandler(e, x, y);
          }
        }, true);
      });
    }
  }
};

exports.BdAIMarker = BdAIMarker;