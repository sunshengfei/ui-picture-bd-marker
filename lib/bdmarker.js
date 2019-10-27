

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDataArray = exports.positionP2S = exports.UUID = exports.BdAIMarker = exports.ResizeAnnotation = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('./config');

var _anno = require('./anno');

var _anno2 = _interopRequireDefault(_anno);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BdAIMarker = function BdAIMarker(layer, draft, resizeAnnotation) {
  var _this = this;

  var configs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, BdAIMarker);

  this.eventTargetOnTransform = false;

  this.$callback_handler = function (onTrans) {
    _this.eventTargetOnTransform = onTrans;
  };

  this.setConfigOptions = function (newOptions) {
    _this.options = _extends({}, _this.options, newOptions.options);
    if (_this.resizeAnnotation) {
      _this.resizeAnnotation.setConfigOptions(newOptions);
    }
  };

  this.mouseEventHandler = function (e, clientX, clientY) {
    var eventType = e.type;
    var boundRect = _this.boundRect();
    _this.moveX = clientX - boundRect.x;
    _this.moveY = clientY - boundRect.y;
    if (_this.eventTargetOnTransform) {
      _this.resizeAnnotation.dragEventOn(e);
      return;
    }
    if (eventType === _config.MOUSE_EVENT[0]) {
      if (e.target.classList.contains(_this.options.annotationClass) || e.target.classList.contains('' + _config.PREFIX_RESIZE_DOT)) {
        _this.eventTargetOnTransform = true;
        _this.resizeAnnotation.dragEventOn(e);
        return;
      }
      if (_this.actionDown) {
        _this.dragTo(_this.moveX, _this.moveY);
        return;
      }
      _this.actionDown = true;
      _this.anchorX = _this.moveX;
      _this.anchorY = _this.moveY;
      _this.resetDraft();
      _this.anchorAt(_this.anchorX, _this.anchorY);
    } else if (eventType === _config.MOUSE_EVENT[1]) {
      if (_this.actionDown) {
        _this.dragTo(_this.moveX, _this.moveY);
      }
    } else if (eventType === _config.MOUSE_EVENT[4]) {
      if (_this.actionDown && _this.resizeAnnotation) {
        _this.resizeAnnotation.drawAnnotation(_this.draftRect);
        _this.resetDraft();
      }
      _this.actionDown = false;
    } else {
      if (_this.actionDown && _this.filterOutOfBounds(_this.moveX, _this.moveY)) {
        if (_this.resizeAnnotation) {
          _this.resizeAnnotation.drawAnnotation(_this.draftRect);
          _this.resetDraft();
        }
        _this.actionDown = false;
      }
    }
  };

  this.anchorAt = function (x, y) {
    if (!_this.options.editable) return;
    _this.draft.style.display = '';
    if (_this.moveX < x) {
      _this.draft.style.right = 100 * Math.abs(_this.boundRect().width - x) / _this.boundRect().width + '%';
      _this.draft.style.left = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        x: (100 * Math.abs(_this.moveX) / _this.boundRect().width).toFixed(3) + '%'
      });
    } else {
      _this.draft.style.left = (100 * Math.abs(x) / _this.boundRect().width).toFixed(3) + '%';
      _this.draft.style.right = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        x: (100 * Math.abs(x) / _this.boundRect().width).toFixed(3) + '%'
      });
    }
    if (_this.moveY < y) {
      _this.draft.style.bottom = (100 * Math.abs(_this.boundRect().height - y) / _this.boundRect().height).toFixed(3) + '%';
      _this.draft.style.top = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        y: (100 * Math.abs(_this.moveY) / _this.boundRect().height).toFixed(3) + '%'
      });
    } else {
      _this.draft.style.top = (100 * Math.abs(y) / _this.boundRect().height).toFixed(3) + '%';
      _this.draft.style.bottom = '';
      _this.draftRect = Object.assign(_this.draftRect, {
        y: (100 * Math.abs(y) / _this.boundRect().height).toFixed(3) + '%'
      });
    }
  };

  this.filterOutOfBounds = function (x, y) {
    return x >= _this.boundRect().width || y >= _this.boundRect().height || x < 1 || y < 1;
  };

  this.resetDraft = function () {
    _this.draftRect = { x: -1, y: -1, width: 0, height: 0 };
    _this.draft.style.width = '0%';
    _this.draft.style.height = '0%';
  };

  this.clearAll = function () {
    var annotations = _this.layer.querySelectorAll(_this.options.annotationClass);
    annotations.forEach(function (item) {
      item.remove();
    });
    _this.renderData(void 0);
  };

  this.dragTo = function (x, y) {
    if (!_this.options.editable) return;
    if (_this.filterOutOfBounds(x, y)) {
      _this.actionDown = false;
    }
    _this.anchorAt(_this.anchorX, _this.anchorY);
    var widthRatio = (100 * Math.abs(x - _this.anchorX) / _this.boundRect().width).toFixed(3);
    var heightRatio = (100 * Math.abs(y - _this.anchorY) / _this.boundRect().height).toFixed(3);
    _this.draftRect = Object.assign(_this.draftRect, {
      width: widthRatio + '%',
      height: heightRatio + '%'
    });
    _this.draft.style.width = _this.draftRect.width;
    _this.draft.style.height = _this.draftRect.height;
  };

  this.renderData = function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments[1];

    var ra = _this.resizeAnnotation;
    if (ra) {
      ra.renderData(dataArray, base);
    }
  };

  this.setTag = function (tag) {
    if (_this.resizeAnnotation && tag) {
      _this.resizeAnnotation.setTagForCurrentMovement(tag);
    }
  };

  this.selectMarkerByTagId = function (tagId) {
    if (tagId) {
      _this.resizeAnnotation.selectMarkerByTagId(tagId);
    }
  };

  this.dataSource = function () {
    if (_this.resizeAnnotation) {
      return _this.resizeAnnotation.dataSource();
    }
    return void 0;
  };

  this.dataForTag = function (tagId, uuid) {
    return _this.resizeAnnotation.dataSourceOfTag(tagId, uuid);
  };

  if ((typeof configs === 'undefined' ? 'undefined' : _typeof(configs)) !== 'object') {
    throw 'Please provide a callback Config for BdAIMarker';
  }
  this.options = _extends({}, _config.defaultConfig.options, configs.options);
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
    this.resizeAnnotation = resizeAnnotation ? resizeAnnotation : new _anno2.default(draft.parentNode, this.boundRect, configs, this.$callback_handler);
    var self = this;
    _config.MOUSE_EVENT.forEach(function (currentValue, index, arr) {
      layer.addEventListener(currentValue, function (e) {
        var x = e.clientX,
            y = e.clientY;
        self.mouseEventHandler(e, x, y);
      }, true);
    });
  }
};

exports.ResizeAnnotation = _anno2.default;
exports.BdAIMarker = BdAIMarker;
exports.UUID = _config.UUID;
exports.positionP2S = _config.positionP2S;
exports.transformDataArray = _config.transformDataArray;