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
exports["default"] = exports.BdAIMarker = void 0;

require("./compatible");

var _config = require("./config");

var _anno = _interopRequireDefault(require("./anno"));

var _movement = _interopRequireDefault(require("./movement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _eventTargetOnTransform = /*#__PURE__*/new WeakMap();

var _moveX = /*#__PURE__*/new WeakMap();

var _moveY = /*#__PURE__*/new WeakMap();

var _anchorX = /*#__PURE__*/new WeakMap();

var _anchorY = /*#__PURE__*/new WeakMap();

var _actionDown = /*#__PURE__*/new WeakMap();

var _resizeAnnotation = /*#__PURE__*/new WeakMap();

var _draftAnnoData = /*#__PURE__*/new WeakMap();

var _callback_handler = /*#__PURE__*/new WeakMap();

var _compatibalBoundRect = /*#__PURE__*/new WeakMap();

var _mouseEventHandler = /*#__PURE__*/new WeakMap();

var _anchorAt = /*#__PURE__*/new WeakMap();

var _filterOutOfBounds = /*#__PURE__*/new WeakMap();

var _dragTo = /*#__PURE__*/new WeakMap();

var BdAIMarker = function BdAIMarker(layer, draft, resizeAnnotation) {
  var _this = this;

  var configs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, BdAIMarker);

  _classPrivateFieldInitSpec(this, _eventTargetOnTransform, {
    writable: true,
    value: false
  });

  _classPrivateFieldInitSpec(this, _moveX, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _moveY, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _anchorX, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _anchorY, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _actionDown, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _resizeAnnotation, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _draftAnnoData, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _callback_handler, {
    writable: true,
    value: function value(onTrans) {
      _classPrivateFieldSet(_this, _eventTargetOnTransform, onTrans);
    }
  });

  _defineProperty(this, "setConfigOptions", function (newOptions) {
    _this.options = _objectSpread(_objectSpread({}, _this.options), newOptions.options);

    if (_classPrivateFieldGet(_this, _resizeAnnotation)) {
      _classPrivateFieldGet(_this, _resizeAnnotation).setConfigOptions(newOptions);
    }
  });

  _classPrivateFieldInitSpec(this, _compatibalBoundRect, {
    writable: true,
    value: function value() {
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
    }
  });

  _classPrivateFieldInitSpec(this, _mouseEventHandler, {
    writable: true,
    value: function value(e, clientX, clientY) {
      // e.preventDefault();
      // e.stopPropagation();
      if (!_this.options.editable) {
        return;
      }

      var eventType = e.type;

      var boundRect = _classPrivateFieldGet(_this, _compatibalBoundRect).call(_this);

      if (clientX) {
        _classPrivateFieldSet(_this, _moveX, clientX - boundRect.x);
      }

      if (clientY) {
        _classPrivateFieldSet(_this, _moveY, clientY - boundRect.y);
      }

      if (eventType === _config.MOUSE_EVENT[6]) {
        _classPrivateFieldSet(_this, _eventTargetOnTransform, false);

        _classPrivateFieldSet(_this, _actionDown, false);

        _classPrivateFieldGet(_this, _resizeAnnotation).dispatchEventToAnno(e);

        return;
      }

      if (_classPrivateFieldGet(_this, _eventTargetOnTransform)) {
        _classPrivateFieldGet(_this, _resizeAnnotation).dispatchEventToAnno(e);

        return;
      }

      if (eventType === _config.MOUSE_EVENT[0] || eventType === _config.TOUCH_EVENT[0]) {
        if (e.target.classList.contains(_this.options.annotationClass) || e.target.classList.contains("".concat(_config.PREFIX_RESIZE_DOT))) {
          _classPrivateFieldSet(_this, _eventTargetOnTransform, true);

          _classPrivateFieldGet(_this, _resizeAnnotation).dispatchEventToAnno(e);

          return;
        }

        if (_classPrivateFieldGet(_this, _actionDown)) {
          _classPrivateFieldGet(_this, _dragTo).call(_this, _classPrivateFieldGet(_this, _moveX), _classPrivateFieldGet(_this, _moveY));

          return;
        }

        _classPrivateFieldSet(_this, _draftAnnoData, _movement["default"].tagTemplate());

        _classPrivateFieldGet(_this, _resizeAnnotation).removeSelectedAnnotation();

        _classPrivateFieldSet(_this, _actionDown, true);

        _classPrivateFieldSet(_this, _anchorX, _classPrivateFieldGet(_this, _moveX));

        _classPrivateFieldSet(_this, _anchorY, _classPrivateFieldGet(_this, _moveY));

        _this.resetDraft();

        _classPrivateFieldGet(_this, _anchorAt).call(_this, _classPrivateFieldGet(_this, _anchorX), _classPrivateFieldGet(_this, _anchorY));
      } else if (eventType === _config.MOUSE_EVENT[1] || eventType === _config.TOUCH_EVENT[1]) {
        if (_classPrivateFieldGet(_this, _actionDown)) {
          _classPrivateFieldGet(_this, _dragTo).call(_this, _classPrivateFieldGet(_this, _moveX), _classPrivateFieldGet(_this, _moveY));
        }
      } else if (eventType === _config.MOUSE_EVENT[4] || eventType === _config.TOUCH_EVENT[2] || eventType === _config.TOUCH_EVENT[4]) {
        if (_classPrivateFieldGet(_this, _actionDown) && _classPrivateFieldGet(_this, _resizeAnnotation)) {
          _classPrivateFieldGet(_this, _resizeAnnotation).drawAnnotation(_this.draftRect, _classPrivateFieldGet(_this, _draftAnnoData));

          _this.resetDraft();
        }

        _classPrivateFieldSet(_this, _actionDown, false);
      } else {
        if (_classPrivateFieldGet(_this, _actionDown) && _classPrivateFieldGet(_this, _filterOutOfBounds).call(_this, _classPrivateFieldGet(_this, _moveX), _classPrivateFieldGet(_this, _moveY))) {
          if (_classPrivateFieldGet(_this, _resizeAnnotation)) {
            _classPrivateFieldGet(_this, _resizeAnnotation).drawAnnotation(_this.draftRect, _classPrivateFieldGet(_this, _draftAnnoData));

            _this.resetDraft();
          }

          _classPrivateFieldSet(_this, _actionDown, false);
        }
      }
    }
  });

  _classPrivateFieldInitSpec(this, _anchorAt, {
    writable: true,
    value: function value(x, y) {
      if (!_this.options.editable) return;

      var ccRect = _classPrivateFieldGet(_this, _compatibalBoundRect).call(_this);

      _this.draft.style.display = '';

      if (_classPrivateFieldGet(_this, _moveX) < x) {
        _this.draft.style.right = 100 * Math.abs(ccRect.width - x) / ccRect.width + '%';
        _this.draft.style.left = '';
        _this.draftRect = Object.assign(_this.draftRect, {
          x: (100 * Math.abs(_classPrivateFieldGet(_this, _moveX)) / ccRect.width).toFixed(3) + '%'
        });
      } else {
        _this.draft.style.left = (100 * Math.abs(x) / ccRect.width).toFixed(3) + '%';
        _this.draft.style.right = '';
        _this.draftRect = Object.assign(_this.draftRect, {
          x: (100 * Math.abs(x) / ccRect.width).toFixed(3) + '%'
        });
      }

      if (_classPrivateFieldGet(_this, _moveY) < y) {
        _this.draft.style.bottom = (100 * Math.abs(ccRect.height - y) / ccRect.height).toFixed(3) + '%';
        _this.draft.style.top = '';
        _this.draftRect = Object.assign(_this.draftRect, {
          y: (100 * Math.abs(_classPrivateFieldGet(_this, _moveY)) / ccRect.height).toFixed(3) + '%'
        });
      } else {
        _this.draft.style.top = (100 * Math.abs(y) / ccRect.height).toFixed(3) + '%';
        _this.draft.style.bottom = '';
        _this.draftRect = Object.assign(_this.draftRect, {
          y: (100 * Math.abs(y) / ccRect.height).toFixed(3) + '%'
        });
      }
    }
  });

  _classPrivateFieldInitSpec(this, _filterOutOfBounds, {
    writable: true,
    value: function value(x, y) {
      return x >= _classPrivateFieldGet(_this, _compatibalBoundRect).call(_this).width || // x >= this.#compatibalBoundRect().x + this.#compatibalBoundRect().width + 2 ||
      y >= _classPrivateFieldGet(_this, _compatibalBoundRect).call(_this).height || // y >= this.#compatibalBoundRect().y + this.#compatibalBoundRect().height + 2 ||
      x < 1 || y < 1;
    }
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

    annotations.forEach(function (node) {
      if (typeof node.remove === 'function') {
        node.remove();
      } else {
        var _node$parentNode;

        (_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.removeChild(node);
      }
    });

    _this.renderData(void 0);
  });

  _classPrivateFieldInitSpec(this, _dragTo, {
    writable: true,
    value: function value(x, y) {
      if (!_this.options.editable) return;

      if (_classPrivateFieldGet(_this, _filterOutOfBounds).call(_this, x, y)) {
        _classPrivateFieldSet(_this, _actionDown, false);
      }

      _classPrivateFieldGet(_this, _anchorAt).call(_this, _classPrivateFieldGet(_this, _anchorX), _classPrivateFieldGet(_this, _anchorY));

      var widthRatio = (100 * Math.abs(x - _classPrivateFieldGet(_this, _anchorX)) / _classPrivateFieldGet(_this, _compatibalBoundRect).call(_this).width).toFixed(3);

      var heightRatio = (100 * Math.abs(y - _classPrivateFieldGet(_this, _anchorY)) / _classPrivateFieldGet(_this, _compatibalBoundRect).call(_this).height).toFixed(3);

      _this.draftRect = Object.assign(_this.draftRect, {
        width: widthRatio + '%',
        height: heightRatio + '%'
      });
      _this.draft.style.width = _this.draftRect.width;
      _this.draft.style.height = _this.draftRect.height;
    }
  });

  _defineProperty(this, "renderData", function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments.length > 1 ? arguments[1] : undefined;

    var ra = _classPrivateFieldGet(_this, _resizeAnnotation);

    if (ra) {
      ra.renderData(dataArray, base);
    }
  });

  _defineProperty(this, "setTag", function (tag) {
    if (_classPrivateFieldGet(_this, _resizeAnnotation) && tag) {
      _classPrivateFieldGet(_this, _resizeAnnotation).setTagForCurrentMovement(tag);
    }
  });

  _defineProperty(this, "selectMarkerByTagId", function (tagId) {
    if (tagId) {
      _classPrivateFieldGet(_this, _resizeAnnotation).selectMarkerByTagId(tagId);
    }
  });

  _defineProperty(this, "dataSource", function () {
    if (_classPrivateFieldGet(_this, _resizeAnnotation)) {
      return _classPrivateFieldGet(_this, _resizeAnnotation).dataSource();
    }

    return void 0;
  });

  _defineProperty(this, "dataForTag", function (tagId, uuid) {
    return _classPrivateFieldGet(_this, _resizeAnnotation).dataSourceOfTag(tagId, uuid);
  });

  _defineProperty(this, "getAnnotation", function () {
    return _classPrivateFieldGet(_this, _resizeAnnotation);
  });

  if (_typeof(configs) !== 'object') {
    throw new Error('Please provide a callback Config for BdAIMarker');
  }

  this.options = _objectSpread(_objectSpread({}, _config.defaultConfig.options), configs.options);

  if (layer) {
    this.layer = layer;
    this.draft = draft;

    _classPrivateFieldSet(this, _actionDown, false);

    this.draftRect = {};

    _classPrivateFieldSet(this, _anchorX, -1);

    _classPrivateFieldSet(this, _anchorY, -1);

    this.boundRect = function () {
      return layer.getBoundingClientRect();
    };

    _classPrivateFieldSet(this, _resizeAnnotation, resizeAnnotation ? resizeAnnotation : new _anno["default"](draft.parentNode, _classPrivateFieldGet(this, _compatibalBoundRect), configs, _classPrivateFieldGet(this, _callback_handler)));

    var self = this;

    if (this.options.deviceType == 'both' || this.options.deviceType == 'mouse') {
      _config.MOUSE_EVENT.forEach(function (currentValue, index, arr) {
        layer.addEventListener(currentValue, function (e) {
          if (_this.options.deviceType == 'touch') {
            return;
          }

          var x = e.clientX,
              y = e.clientY;

          _classPrivateFieldGet(self, _mouseEventHandler).call(self, e, x, y);
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

            _classPrivateFieldGet(self, _mouseEventHandler).call(self, e, x, y);
          }
        }, true);
      });
    }
  }
};

exports.BdAIMarker = BdAIMarker;
BdAIMarker.prototype.util = {
  UUID: _config.UUID,
  positionP2S: _config.positionP2S,
  transformDataArray: _config.transformDataArray
};
var _default = BdAIMarker;
exports["default"] = _default;