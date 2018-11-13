"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDataArray = exports.positionP2S = exports.UUID = exports.BdAIMarker = exports.ResizeAnnotation = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _util = require("util");

var _timers = require("timers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

'use strict';

var MOUSE_EVENT = ['mousedown', 'mousemove', 'mouseend', 'mouseout', 'mouseup', 'mouseleave'];
var drawCursorEvent = MOUSE_EVENT;
var eventTargetOnTransform = false;
var imageOpTag = 'g-image-op-name';
var options = {
  blurOtherDots: true,
  blurOtherDotsShowTags: false,
  editable: true,
  trashPositionStart: 0,
  boundReachPercent: 0.01
};

var PREFIX_RESIZE_DOT = 'resize-dot';

var cls = [PREFIX_RESIZE_DOT + "-n", PREFIX_RESIZE_DOT + "-s", PREFIX_RESIZE_DOT + "-w", PREFIX_RESIZE_DOT + "-e", PREFIX_RESIZE_DOT + "-nw", PREFIX_RESIZE_DOT + "-ne", PREFIX_RESIZE_DOT + "-sw", PREFIX_RESIZE_DOT + "-se", PREFIX_RESIZE_DOT + "-tag-trash"];

var UUID = function UUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
      i = void 0;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r = void 0;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

var percentToSize = function percentToSize(percent) {
  var baseWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return parseFloat(percent).toFixed(3) * baseWith / 100;
};

var positionP2S = function positionP2S() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: '0%', y: '0%', x1: '0%', y1: '0%' };
  var baseWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var o in position) {
    position[o] = percentToSize(position[o], baseWith);
  }
  return position;
};

var transformDataArray = function transformDataArray() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var baseWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var i = 0; i < data.length; i++) {
    var o = data[i];
    o.position = positionP2S(o.position, baseWith);
  }
  return data;
};

var Movement = function Movement(node) {
  var _this = this;

  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var boundRect = arguments[2];

  _classCallCheck(this, Movement);

  this.transform = function (offsetX, offsetY) {
    if (!options.editable) return;
    var parentEl = _this.moveNode;
    var rawHeightp = parseFloat(parentEl.style.height);
    var rawWidthp = parseFloat(parentEl.style.width);
    var rawTop = parseFloat(parentEl.style.top);
    var rawLeft = parseFloat(parentEl.style.left);
    var heightOffset = 100 * offsetY / _this.boundRect.height;
    var widthOffset = 100 * offsetX / _this.boundRect.width;

    if (rawTop + heightOffset < options.boundReachPercent || rawTop + heightOffset > 100 - options.boundReachPercent) {
      return;
    }
    if (_this.type === 0) {
      if (rawHeightp - heightOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
    } else if (_this.type === 1) {
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
    } else if (_this.type === 2) {
      if (widthOffset + rawLeft < options.boundReachPercent || widthOffset + rawLeft >= rawWidthp + rawLeft) {
        return;
      }
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 3) {
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === 4) {
      if (rawHeightp - heightOffset < options.boundReachPercent) {
        return;
      }
      if (rawWidthp - widthOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 5) {
      if (rawWidthp + widthOffset < options.boundReachPercent) {
        return;
      }
      if (rawHeightp - heightOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === 6) {
      if (rawHeightp + heightOffset < options.boundReachPercent) {
        return;
      }
      if (rawWidthp - widthOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    } else if (_this.type === 7) {
      if (rawHeightp + heightOffset < options.boundReachPercent) {
        return;
      }
      if (rawWidthp + widthOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (_this.type === -1) {
      if (heightOffset + rawTop < options.boundReachPercent || heightOffset + rawTop + rawHeightp > 100 - options.boundReachPercent) {
        return;
      }
      if (widthOffset + rawLeft < options.boundReachPercent || widthOffset + rawLeft + rawWidthp > 100 - options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (heightOffset + rawTop).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
    }
  };

  this.moveNode = node;
  this.type = type;
  this.boundRect = boundRect;
};

var ResizeAnnotation = function ResizeAnnotation(parentNode, boundRect) {
  var _this2 = this;

  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ResizeAnnotation.defaultConfig;

  _classCallCheck(this, ResizeAnnotation);

  this.dataTemplate = function (tag, x, y, x1, y1) {
    if (!tag || !/^.+$/gi.test(tag)) {
      tag = {
        tag: "temp@" + new Date().getTime()
      };
    }
    return _extends({}, tag, {
      position: {
        x: x,
        y: y,
        x1: x1,
        y1: y1
      }
    });
  };

  this.reset = function () {
    _this2.data = [];
  };

  this.isValid = function (rect) {
    return rect && parseFloat(rect.width) > 1 && parseFloat(rect.height) > 1;
  };

  this.renderData = function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { width: _this2.boundRect.width, height: _this2.boundRect.height };

    if (dataArray instanceof Array && dataArray.length > 0) {
      dataArray.forEach(function (data, index, arr) {
        var rect = {
          x: (100 * data.position.x / base.width).toFixed(3) + '%',
          y: (100 * data.position.y / base.height).toFixed(3) + '%',
          width: (100 * (data.position.x1 - data.position.x) / base.width).toFixed(3) + '%',
          height: (100 * (data.position.y1 - data.position.y) / base.height).toFixed(3) + '%'
        };
        _this2.drawAnnotation(rect, data);
      });
    } else {
      _this2.reset();
    }
    _this2.callback.onDataRendered();
  };

  this.dataSource = function () {
    return _this2.data;
  };

  this.dataSourceOfTag = function (tagId, uuid) {
    for (var i = 0; i < _this2.data.length; i++) {
      var value = _this2.data[i];
      if (value.tag === tagId && value.uuid == uuid) {
        return value;
      }
    }
  };

  this.setTagForCurrentMovement = function (tagOb) {
    if (_this2.currentMovement) {
      var node = _this2.currentMovement.moveNode;
      var tag_str = '',
          tag_id = '';
      if (typeof tagOb === 'string') {
        tag_id = tag_str = tagOb;
      }
      var oldtag = node.querySelector("." + imageOpTag).dataset.id;
      if ((typeof tagOb === "undefined" ? "undefined" : _typeof(tagOb)) === 'object') {
        tag_str = tagOb['tagName'];
        tag_id = tagOb['tag'];
        for (var k in tagOb) {
          node.querySelector("." + imageOpTag).dataset[k] = tagOb[k];
        }
      }
      var uuid = node.dataset.uuid;
      node.querySelector("." + imageOpTag).innerText = tag_str;
      for (var i = 0; i < _this2.data.length; i++) {
        var value = _this2.data[i];
        if (value.tag === oldtag && value.uuid === uuid) {
          value.tag = tag_id;
          value.tagName = tag_str;
          node.querySelector("." + imageOpTag).dataset.id = tag_id;
          node.querySelector("." + imageOpTag).dataset.name = tag_str;
        }
        _this2.data[i] = value;
      }
      _this2.callback.onUpdated(_this2.dataSource());
    }
  };

  this.updateMovementData = function () {
    if (_this2.currentMovement == null) return;
    var node = _this2.currentMovement.moveNode;
    var uuid = node.dataset.uuid;
    var tag = node.querySelector("." + imageOpTag).dataset.id;
    var position = {
      x: node.style.left,
      y: node.style.top,
      x1: (parseFloat(node.style.width) + parseFloat(node.style.left)).toFixed(3) + '%',
      y1: (parseFloat(node.style.height) + parseFloat(node.style.top)).toFixed(3) + '%'
    };

    for (var i = 0; i < _this2.data.length; i++) {
      var value = _this2.data[i];
      if (value.tag === tag && value.uuid === uuid) {
        value.position = position;
      }
      _this2.data[i] = value;
    }
    _this2.callback.onUpdated(_this2.dataSource(), _this2.currentMovement);
  };

  this.removeAnnotationEvent = function (e) {
    if (!options.editable) return;
    if (_this2.currentMovement) {
      var node = _this2.currentMovement.moveNode;
      var uuid = node.dataset.uuid;
      var tag = node.querySelector("." + imageOpTag).dataset.id;
      for (var i = 0; i < _this2.data.length; i++) {
        var value = _this2.data[i];
        if (value.tag === tag && value.uuid === uuid) {
          _this2.data.splice(i, 1);
          break;
        }
      }
      _this2.callback.onUpdated(_this2.dataSource());
    }
    e.target.parentNode.parentNode.parentNode.remove();
  };

  this.drawAnnotation = function (rect) {
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

    if (!_this2.isValid(rect)) return;
    _this2.removeSelectedAnnotation();

    var annotation = document.createElement('div');
    annotation.className = 'annotation selected';
    annotation.style.position = 'absolute';
    annotation.style.top = rect.y;
    annotation.style.left = rect.x;
    annotation.style.width = rect.width;
    annotation.style.height = rect.height;

    var resizeDotClasses = {
      top: PREFIX_RESIZE_DOT + " top",
      bottom: PREFIX_RESIZE_DOT + " bottom",
      left: PREFIX_RESIZE_DOT + " left",
      right: PREFIX_RESIZE_DOT + " right",
      topLeft: PREFIX_RESIZE_DOT + " top-left",
      topRight: PREFIX_RESIZE_DOT + " top-right",
      bottomLeft: PREFIX_RESIZE_DOT + " bottom-left",
      bottomRight: PREFIX_RESIZE_DOT + " bottom-right",
      trash: 'g-image-op'
    };
    var uu = "" + UUID(16, 16);
    annotation.dataset.uuid = uu;

    var i = 0;
    var tagString = void 0,
        tagId = void 0;
    if ((typeof tag === "undefined" ? "undefined" : _typeof(tag)) === 'object') {
      tagString = tag.tagName;
      tagId = tag.tag;
    } else if (typeof tag === 'string') {
      tagString = tag;
      tagId = tag;
    } else {
      tagString = '请选择或添加新标签';
      tagId = "temp@" + uu;
      tag = {
        tag: tagId,
        tagName: tagString
      };
    }
    for (var prop in resizeDotClasses) {
      var resizeDot = document.createElement('div');
      if (i === 8) {
        resizeDot.className = (options.blurOtherDotsShowTags ? '' : "" + cls[i]) + " " + resizeDotClasses[prop];
        var opContent = document.createElement('div');
        opContent.className = 'g-image-op-content';
        var trash = document.createElement('i');
        trash.className = 'g-image-op-del iconfont s-icon icon-trash s-icon-trash';
        trash.innerText = ' × ';
        trash.addEventListener('click', _this2.removeAnnotationEvent, true);
        var _tag = document.createElement('span');
        _tag.dataset.name = tagString;
        _tag.className = "" + imageOpTag;
        _tag.innerText = tagString;
        _tag.dataset.id = tagId;
        if (options.trashPositionStart) {
          opContent.appendChild(trash);
          opContent.appendChild(_tag);
        } else {
          opContent.appendChild(_tag);
          opContent.appendChild(trash);
        }
        resizeDot.appendChild(opContent);
      } else {
        resizeDot.className = resizeDotClasses[prop] + " " + cls[i] + " " + (options.editable ? '' : 'hidden');
      }
      annotation.appendChild(resizeDot);
      i++;
    }

    _this2.annotationContainer.appendChild(annotation);
    _this2.currentMovement = new Movement(annotation, 0, _this2.boundRect);

    var dts = _this2.dataTemplate(tag, rect.x, rect.y, parseFloat(rect.x) + parseFloat(rect.width) + '%', parseFloat(rect.y) + parseFloat(rect.height) + '%');
    _this2.data.push(_extends({}, dts, { uuid: uu }));
    _this2.callback.onUpdated(_this2.dataSource());
    _this2.callback.onDrawOne(dts, _this2.currentMovement);
  };

  this.dragEventOn = function (e) {
    var eventType = e.type;
    var clientX = e.clientX,
        clientY = e.clientY;
    _this2.moveX = clientX;
    _this2.moveY = clientY;
    if (eventType === MOUSE_EVENT[0]) {
      _this2.actionDown = true;
      _this2.lastX = _this2.moveX;
      _this2.lastY = _this2.moveY;
      eventTargetOnTransform = true;
      _this2.targetEventType(e);
    } else if (eventType === MOUSE_EVENT[1] || eventType === MOUSE_EVENT[3] || eventType === MOUSE_EVENT[5]) {
      if (_this2.currentMovement == null) {
        return true;
      }
      if (_this2.actionDown) {
        if (_this2.filterOutOfBounds(_this2.moveX, _this2.moveY)) return;
        _this2.currentMovement.transform(_this2.moveX - _this2.lastX, _this2.moveY - _this2.lastY);
        _this2.lastX = _this2.moveX;
        _this2.lastY = _this2.moveY;
      }
    } else {
      if (_this2.actionDown) {
        _this2.updateMovementData();
        _this2.selectAnnotation();
      }
      _this2.actionDown = false;
      eventTargetOnTransform = false;
    }
  };

  this.removeSelectedAnnotation = function () {
    if (_this2.currentMovement) {
      var cs = _this2.currentMovement.moveNode.classList;
      cs.remove('selected');
      if (options.blurOtherDots) {
        _this2.currentMovement.moveNode.querySelectorAll("[class*=" + PREFIX_RESIZE_DOT + "]").forEach(function (node) {
          node.classList.add('hidden');
        });
      }
    }
  };

  this.selectAnnotation = function () {
    var isUserinteracted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (_this2.currentMovement) {
      var cs = _this2.currentMovement.moveNode.classList;
      cs.add('selected');
      if (options.blurOtherDots) {
        if (!options.editable) {
          _this2.currentMovement.moveNode.querySelectorAll("[class*=" + PREFIX_RESIZE_DOT + "]").forEach(function (node) {
            if (node.classList.contains(cls[8])) {
              node.classList.remove('hidden');
            } else {
              node.classList.add('hidden');
            }
          });
          return;
        }
        _this2.currentMovement.moveNode.querySelectorAll("[class*=" + PREFIX_RESIZE_DOT + "]").forEach(function (node) {
          node.classList.remove('hidden');
        });
      }
      if (!isUserinteracted) return;
      var node = _this2.currentMovement.moveNode;
      var tag_str = node.querySelector("." + imageOpTag).innerText;
      var tagAttr = node.querySelector("." + imageOpTag).dataset;
      _this2.callback.onSelect(_extends({}, tagAttr, _this2.dataSourceOfTag(tagAttr.id, node.dataset.uuid)));
    }
  };

  this.selectMarkerByTagId = function (tagId) {
    var tag = _this2.annotationContainer.querySelector("[data-id=\"" + tagId + "\"]");
    if (tag) {
      var markerAnnotation = tag.parentNode.parentNode.parentNode;
      _this2.removeSelectedAnnotation();
      _this2.currentMovement = new Movement(markerAnnotation, -1, _this2.boundRect);
      _this2.selectAnnotation(false);
    }
  };

  this.targetEventType = function (e) {
    _this2.removeSelectedAnnotation();
    var el = e.target;
    var parentEl = el.classList.contains('annotation') ? el : el.parentNode;
    if (el.classList.contains(cls[0])) {
      _this2.currentMovement = new Movement(parentEl, 0, _this2.boundRect);
    } else if (el.classList.contains(cls[1])) {
      _this2.currentMovement = new Movement(parentEl, 1, _this2.boundRect);
    } else if (el.classList.contains(cls[2])) {
      _this2.currentMovement = new Movement(parentEl, 2, _this2.boundRect);
    } else if (el.classList.contains(cls[3])) {
      _this2.currentMovement = new Movement(parentEl, 3, _this2.boundRect);
    } else if (el.classList.contains(cls[4])) {
      _this2.currentMovement = new Movement(parentEl, 4, _this2.boundRect);
    } else if (el.classList.contains(cls[5])) {
      _this2.currentMovement = new Movement(parentEl, 5, _this2.boundRect);
    } else if (el.classList.contains(cls[6])) {
      _this2.currentMovement = new Movement(parentEl, 6, _this2.boundRect);
    } else if (el.classList.contains(cls[7])) {
      _this2.currentMovement = new Movement(parentEl, 7, _this2.boundRect);
    } else if (el.classList.contains('annotation')) {
      _this2.currentMovement = new Movement(parentEl, -1, _this2.boundRect);
    } else {
      _this2.currentMovement = null;
    }
  };

  this.filterOutOfBounds = function (x, y) {
    return x >= _this2.boundRect.x + _this2.boundRect.width + 2 || y >= _this2.boundRect.y + _this2.boundRect.height + 2 || x < 5 || y < 5;
  };

  options = Object.assign(options, callback.options);
  this.annotationContainer = parentNode;
  this.boundRect = boundRect;
  this.actionDown = false;
  this.currentMovement = null;
  this.callback = Object.assign(ResizeAnnotation.defaultConfig, callback);
  this.data = [];
};

ResizeAnnotation.defaultConfig = {
  options: {},
  onDataRendered: function onDataRendered() {},
  onUpdated: function onUpdated() {},
  onDrawOne: function onDrawOne() {},
  onSelect: function onSelect() {}
};

var BdAIMarker = function BdAIMarker(layer, draft, resizeAnnotation) {
  var _this3 = this;

  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  _classCallCheck(this, BdAIMarker);

  _initialiseProps.call(this);

  if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== 'object') {
    throw 'Please provide a callback Config for BdAIMarker';
  }
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
    this.resizeAnnotation = resizeAnnotation ? resizeAnnotation : new ResizeAnnotation(draft.parentNode, this.boundRect(), options);
    drawCursorEvent.forEach(function (currentValue, index, arr) {
      layer.addEventListener(currentValue, function (e) {
        var x = e.clientX,
            y = e.clientY;
        _this3.mouseEventHandler(e, x, y);
      }, true);
    });
  }
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.mouseEventHandler = function (e, clientX, clientY) {
    var boundRect = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _this4.boundRect();

    var eventType = e.type;
    _this4.moveX = clientX - boundRect.x;
    _this4.moveY = clientY - boundRect.y;
    if (eventTargetOnTransform) {
      _this4.resizeAnnotation.dragEventOn(e);
      return;
    }
    if (eventType === MOUSE_EVENT[0]) {
      if (e.target.classList.contains('annotation') || e.target.classList.contains("" + PREFIX_RESIZE_DOT)) {
        eventTargetOnTransform = true;
        _this4.resizeAnnotation.dragEventOn(e);
        return;
      }
      if (_this4.actionDown) {
        _this4.dragTo(_this4.moveX, _this4.moveY);
        return;
      }
      _this4.actionDown = true;
      _this4.anchorX = _this4.moveX;
      _this4.anchorY = _this4.moveY;
      _this4.resetDraft();
      _this4.anchorAt(_this4.anchorX, _this4.anchorY);
    } else if (eventType === MOUSE_EVENT[1]) {
      if (_this4.actionDown) {
        _this4.dragTo(_this4.moveX, _this4.moveY);
      }
    } else if (eventType === MOUSE_EVENT[4]) {
      if (_this4.actionDown && _this4.resizeAnnotation) {
        _this4.resizeAnnotation.drawAnnotation(_this4.draftRect);
        _this4.resetDraft();
      }
      _this4.actionDown = false;
    } else {
      if (_this4.actionDown && _this4.filterOutOfBounds(_this4.moveX, _this4.moveY)) {
        if (_this4.resizeAnnotation) {
          _this4.resizeAnnotation.drawAnnotation(_this4.draftRect);
          _this4.resetDraft();
        }
        _this4.actionDown = false;
      }
    }
  };

  this.anchorAt = function (x, y) {
    if (!options.editable) return;
    _this4.draft.style.display = '';
    if (_this4.moveX < x) {
      _this4.draft.style.right = 100 * Math.abs(_this4.boundRect().width - x) / _this4.boundRect().width + '%';
      _this4.draft.style.left = '';
      _this4.draftRect = Object.assign(_this4.draftRect, {
        x: (100 * Math.abs(_this4.moveX) / _this4.boundRect().width).toFixed(3) + '%'
      });
    } else {
      _this4.draft.style.left = (100 * Math.abs(x) / _this4.boundRect().width).toFixed(3) + '%';
      _this4.draft.style.right = '';
      _this4.draftRect = Object.assign(_this4.draftRect, {
        x: (100 * Math.abs(x) / _this4.boundRect().width).toFixed(3) + '%'
      });
    }
    if (_this4.moveY < y) {
      _this4.draft.style.bottom = (100 * Math.abs(_this4.boundRect().height - y) / _this4.boundRect().height).toFixed(3) + '%';
      _this4.draft.style.top = '';
      _this4.draftRect = Object.assign(_this4.draftRect, {
        y: (100 * Math.abs(_this4.moveY) / _this4.boundRect().height).toFixed(3) + '%'
      });
    } else {
      _this4.draft.style.top = (100 * Math.abs(y) / _this4.boundRect().height).toFixed(3) + '%';
      _this4.draft.style.bottom = '';
      _this4.draftRect = Object.assign(_this4.draftRect, {
        y: (100 * Math.abs(y) / _this4.boundRect().height).toFixed(3) + '%'
      });
    }
  };

  this.filterOutOfBounds = function (x, y) {
    return x >= _this4.boundRect().x + _this4.boundRect().width + 2 || y >= _this4.boundRect().y + _this4.boundRect().height + 2 || x < 5 || y < 5;
  };

  this.resetDraft = function () {
    _this4.draftRect = { x: -1, y: -1, width: 0, height: 0 };
    _this4.draft.style.width = '0%';
    _this4.draft.style.height = '0%';
  };

  this.clearAll = function () {
    var annotations = _this4.layer.querySelectorAll('div.annotation');
    annotations.forEach(function (item) {
      item.remove();
    });
    _this4.renderData(void 0);
  };

  this.dragTo = function (x, y) {
    if (!options.editable) return;
    if (_this4.filterOutOfBounds(x, y)) {
      _this4.actionDown = false;
    }
    _this4.anchorAt(_this4.anchorX, _this4.anchorY);
    var widthRatio = (100 * Math.abs(x - _this4.anchorX) / _this4.boundRect().width).toFixed(3);
    var heightRatio = (100 * Math.abs(y - _this4.anchorY) / _this4.boundRect().height).toFixed(3);
    _this4.draftRect = Object.assign(_this4.draftRect, {
      width: widthRatio + '%',
      height: heightRatio + '%'
    });
    _this4.draft.style.width = _this4.draftRect.width;
    _this4.draft.style.height = _this4.draftRect.height;
  };

  this.renderData = function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments[1];

    var ra = _this4.resizeAnnotation;
    if (ra) {
      ra.renderData(dataArray, base);
    }
  };

  this.setTag = function (tag) {
    if (_this4.resizeAnnotation && tag) {
      _this4.resizeAnnotation.setTagForCurrentMovement(tag);
    }
  };

  this.selectMarkerByTagId = function (tagId) {
    if (tagId) {
      _this4.resizeAnnotation.selectMarkerByTagId(tagId);
    }
  };

  this.dataSource = function () {
    if (_this4.resizeAnnotation) {
      return _this4.resizeAnnotation.dataSource();
    }
    return void 0;
  };

  this.dataForTag = function (tagId, uuid) {
    return _this4.resizeAnnotation.dataSourceOfTag(tagId, uuid);
  };
};

exports.ResizeAnnotation = ResizeAnnotation;
exports.BdAIMarker = BdAIMarker;
exports.UUID = UUID;
exports.positionP2S = positionP2S;
exports.transformDataArray = transformDataArray;