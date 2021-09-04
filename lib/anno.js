'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./compatible");

var _config = require("./config");

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

var _boundRect = /*#__PURE__*/new WeakMap();

var _callback_handler = /*#__PURE__*/new WeakMap();

var _lastX = /*#__PURE__*/new WeakMap();

var _lastY = /*#__PURE__*/new WeakMap();

var _moveX = /*#__PURE__*/new WeakMap();

var _moveY = /*#__PURE__*/new WeakMap();

var _currentMovementDisabled = /*#__PURE__*/new WeakMap();

var _event = /*#__PURE__*/new WeakMap();

var _uiconstruct = /*#__PURE__*/new WeakMap();

var _removeAnnotationEvent = /*#__PURE__*/new WeakMap();

var _targetEventType = /*#__PURE__*/new WeakMap();

var ResizeAnnotation = function ResizeAnnotation(parentNode, boundRect) {
  var _this = this;

  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config.defaultConfig;
  var callback_handler = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, ResizeAnnotation);

  _classPrivateFieldInitSpec(this, _boundRect, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _callback_handler, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _lastX, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _lastY, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _moveX, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _moveY, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _currentMovementDisabled, {
    writable: true,
    value: void 0
  });

  _classPrivateFieldInitSpec(this, _event, {
    writable: true,
    value: function value() {
      if (_this.options.supportDelKey && _this.options.closable) {
        document.addEventListener("keydown", _this.delEvent);
      } else {
        document.removeEventListener("keydown", _this.delEvent);
      }
    }
  });

  _classPrivateFieldInitSpec(this, _uiconstruct, {
    writable: true,
    value: function value() {
      if (_this.annotationContainer) {
        var imageOpContents = _this.annotationContainer.querySelectorAll(".".concat(_config.imageOpContent));

        for (var index = 0; index < imageOpContents.length; index++) {
          var opContent = imageOpContents[index];

          if (!_this.options.showTags) {
            opContent.style.visibility = 'collapse';
          } else {
            opContent.style.visibility = 'visible';
          }

          if (_this.options.tagLocation == _config.defaultPositions.out_bottom) {
            opContent.style.position = 'absolute';
            opContent.style.bottom = null;
          } else {
            opContent.style.position = null;
          }

          var delEl = opContent.querySelector('.g-image-op-del');

          if (delEl) {
            if (_this.options.closable) {
              delEl.style.display = '';
            } else {
              delEl.style.display = "none";
            }
          }

          if (_this.options.textComponent) {
            var element = _this.options.textComponent.apply(null, [opContent]);

            if (!element) {
              //默认
              break;
            }

            if (!(element instanceof Element)) {
              throw new Error("closeComponent not a Element");
            }

            if (opContent.hasChildNodes()) {
              var opChildren = opContent.childNodes;

              for (var _index = opChildren.length - 1; _index > -1; _index--) {
                var rmEl = opChildren[_index];
                rmEl && opContent.removeChild(rmEl);
              }

              opContent.appendChild(element);
            }
          }
        }
      } //


      if (_this.currentMovement && !_this.options.editable) {
        _this.currentMovement.currentNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
          if (node.classList.contains(_config.dotCls[8])) {
            node.classList.remove('hidden');
          } else {
            node.classList.add('hidden');
          }
        });
      }
    }
  });

  _defineProperty(this, "setConfigOptions", function (newOptions) {
    _this.options = _objectSpread(_objectSpread({}, _this.options), newOptions.options);
    _this.config = _objectSpread(_objectSpread({}, _this.config), newOptions);

    _classPrivateFieldGet(_this, _event).call(_this);

    _classPrivateFieldGet(_this, _uiconstruct).call(_this);
  });

  _defineProperty(this, "dataTemplate", function () {
    return _movement["default"].dataTemplate.apply(_movement["default"], arguments);
  });

  _defineProperty(this, "reset", function () {
    _this.data = [];

    _this.config.onUpdated([]);
  });

  _defineProperty(this, "isValid", function (rect) {
    if (!rect) {
      return false;
    }

    var valid = [];

    if (/^\d*(\.\d+)?%$/.test(rect.width)) {
      valid.push(true);
    } else if (parseFloat(rect.width) < 1) {
      valid.push(false);
    }

    if (/^\d*(\.\d+)?%$/.test(rect.height)) {
      valid.push(true);
    } else if (parseFloat(rect.height) < 1) {
      valid.push(false);
    }

    return valid.filter(Boolean).length == valid.length;
  });

  _defineProperty(this, "renderData", function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      width: _classPrivateFieldGet(_this, _boundRect).call(_this).width,
      height: _classPrivateFieldGet(_this, _boundRect).call(_this).height
    };

    if (dataArray instanceof Array && dataArray.length > 0) {
      dataArray.forEach(function (data, index, arr) {
        var rect;

        if (data.position.x.endsWith('%')) {
          rect = {
            x: data.position.x,
            y: data.position.y,
            width: parseFloat(data.position.x1) - parseFloat(data.position.x) + '%',
            height: parseFloat(data.position.y1) - parseFloat(data.position.y) + '%'
          };
        } else {
          rect = {
            x: (100 * data.position.x / base.width).toFixed(3) + '%',
            y: (100 * data.position.y / base.height).toFixed(3) + '%',
            width: (100 * (data.position.x1 - data.position.x) / base.width).toFixed(3) + '%',
            height: (100 * (data.position.y1 - data.position.y) / base.height).toFixed(3) + '%'
          };
        }

        _this.drawAnnotation(rect, data);
      });
    } else {
      _this.reset();
    }

    _this.config.onAnnoDataFullLoaded();
  });

  _defineProperty(this, "dataSource", function () {
    return _this.data;
  });

  _defineProperty(this, "dataSourceOfTag", function (tagId) {
    for (var i = 0; i < _this.data.length; i++) {
      var value = _this.data[i];

      if (value.tag === tagId && value.uuid == uuid) {
        return value;
      }
    }
  });

  _defineProperty(this, "dataSourceOfUUID", function (uuid) {
    for (var i = 0; i < _this.data.length; i++) {
      var value = _this.data[i];

      if (value.uuid == uuid) {
        return value;
      }
    }
  });

  _defineProperty(this, "setTagForCurrentMovement", function (tagOb) {
    if (_this.currentMovement) {
      var node = _this.currentMovement.currentNode;

      var nTag = _this.currentMovement.updateTag(tagOb);

      var oldtag = node.querySelector(".".concat(_config.imageOpTag)).dataset.id;

      for (var k in nTag) {
        node.querySelector(".".concat(_config.imageOpTag)).dataset[k] = nTag[k];
      }

      var _uuid = node.dataset.uuid;
      node.querySelector(".".concat(_config.imageOpTag)).innerText = nTag.tagName;

      for (var i = 0; i < _this.data.length; i++) {
        var value = _this.data[i];
        var oldValue = Object.assign({}, value);

        if (value.tag === oldtag && value.uuid === _uuid) {
          value = _objectSpread(_objectSpread({}, value), nTag);
          node.querySelector(".".concat(_config.imageOpTag)).dataset.id = nTag.tag;
          node.querySelector(".".concat(_config.imageOpTag)).dataset.name = nTag.tagName;

          _this.config.onAnnoChanged(value, oldValue);

          _this.data[i] = value;
          break;
        }
      }

      _this.config.onUpdated(_this.dataSource());
    }
  });

  _defineProperty(this, "updateMovementData", function () {
    //获取tag
    if (_this.currentMovement == null) return;
    var newData = _this.currentMovement.data; //从原有的数据集查找该tag

    var changed = false;

    for (var i = 0; i < _this.data.length; i++) {
      var oldValue = _this.data[i];

      if (oldValue.tag === newData.tag && newData.uuid === oldValue.uuid) {
        if (JSON.stringify(oldValue) != JSON.stringify(newData)) {
          _this.data[i] = newData;
          changed = true;

          _this.config.onAnnoChanged(newData, oldValue);
        }

        break;
      }
    }

    if (changed) {
      _this.config.onUpdated(_this.dataSource(), _this.currentMovement);
    }
  });

  _classPrivateFieldInitSpec(this, _removeAnnotationEvent, {
    writable: true,
    value: function value(e) {
      if (!_this.options.editable) return;
      var selectNode = e.currentTarget.parentNode.parentNode.parentNode;

      _this.removeAnnotation(selectNode);
    }
  });

  _defineProperty(this, "removeAnnotation", function (node) {
    if (node) {
      var _uuid2 = node.dataset.uuid; // const tag = node.querySelector(`.${imageOpTag}`).dataset.id;

      var value;

      for (var i = 0; i < _this.data.length; i++) {
        value = _this.data[i];

        if ( //value.tag === tag && 
        value.uuid === _uuid2) {
          if (_this.config.onAnnoRemoved(value)) {
            _this.data.splice(i, 1);
          }

          break;
        }
      }

      _this.config.onUpdated(_this.dataSource());

      if (typeof node.remove === 'function') {
        node.remove();
      } else {
        var _node$parentNode;

        (_node$parentNode = node.parentNode) === null || _node$parentNode === void 0 ? void 0 : _node$parentNode.removeChild(node);
      }
    }
  });

  _defineProperty(this, "drawAnnotation", function (rect) {
    var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

    if (!_this.isValid(rect)) {
      return;
    }

    _this.removeSelectedAnnotation(); //创建Annotation节点


    var annotation = document.createElement('div');
    annotation.className = "".concat(_this.options.annotationClass, " selected");
    annotation.style.position = 'absolute';
    annotation.style.top = rect.y;
    annotation.style.left = rect.x;
    annotation.style.width = rect.width;
    annotation.style.height = rect.height; //创建8个resizeDot

    var resizeDotClasses = {
      top: "".concat(_config.PREFIX_RESIZE_DOT, " top"),
      bottom: "".concat(_config.PREFIX_RESIZE_DOT, " bottom"),
      left: "".concat(_config.PREFIX_RESIZE_DOT, " left"),
      right: "".concat(_config.PREFIX_RESIZE_DOT, " right"),
      topLeft: "".concat(_config.PREFIX_RESIZE_DOT, " top-left"),
      topRight: "".concat(_config.PREFIX_RESIZE_DOT, " top-right"),
      bottomLeft: "".concat(_config.PREFIX_RESIZE_DOT, " bottom-left"),
      bottomRight: "".concat(_config.PREFIX_RESIZE_DOT, " bottom-right"),
      trash: 'g-image-op'
    };
    var i = 0;

    if (_typeof(tag) === 'object') {
      tag = _objectSpread(_objectSpread({}, _movement["default"].tagTemplate(tag.tagName, tag.tag, tag.uuid)), tag);
      console.log("💥💥💥💥💥💥💥", tag.uuid);
    } // else if (typeof tag === 'string') {
    //     tag = Movement.tagTemplate(tag, tag)
    // } else {
    //     tag = Movement.tagTemplate()
    // }


    for (var prop in resizeDotClasses) {
      var resizeDot = document.createElement('div');

      if (i === 8) {
        resizeDot.className = "".concat(_this.options.blurOtherDotsShowTags ? '' : "".concat(_config.dotCls[i]), " ").concat(resizeDotClasses[prop]);
        var opContent = document.createElement('div');
        opContent.className = _config.imageOpContent;

        if (!_this.options.showTags) {
          opContent.style.visibility = 'collapse';
        } else {
          opContent.style.visibility = 'visible';
        }

        if (_this.options.tagLocation == _config.defaultPositions.out_bottom) {
          opContent.style.position = 'absolute';
          opContent.style.bottom = null;
        } else {
          opContent.style.position = null;
        }

        var trash = document.createElement('i');
        trash.className = 'g-image-op-del iconfont s-icon icon-trash s-icon-trash';
        trash.innerText = ' × ';
        trash.addEventListener('click', _classPrivateFieldGet(_this, _removeAnnotationEvent), true);

        if (!_this.options.closable) {
          trash.style.display = 'none';
        } else {
          trash.style.display = '';
        }

        var tagEl = document.createElement('span');
        tagEl.dataset.name = tag.tagName;
        tagEl.className = "".concat(_config.imageOpTag);
        tagEl.innerText = tag.tagName;
        tagEl.dataset.id = tag.tag;

        if (_this.options.trashPositionStart) {
          opContent.appendChild(trash);
          opContent.appendChild(tagEl);
        } else {
          opContent.appendChild(tagEl);
          opContent.appendChild(trash);
        }

        resizeDot.appendChild(opContent);
      } else {
        resizeDot.className = "".concat(resizeDotClasses[prop], " ").concat(_config.dotCls[i], " ").concat(_this.options.editable ? '' : 'hidden');
      }

      annotation.appendChild(resizeDot);
      i++;
    } //加事件


    _this.annotationContainer.appendChild(annotation);

    annotation.oncontextmenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var node = e.currentTarget;
      var tagAttr = node.querySelector(".".concat(_config.imageOpTag)).dataset;

      var ab = _this.dataSourceOfTag(tagAttr.id, node.dataset.uuid);

      _this.config.onAnnoContextMenu(ab, e.target, _this); // this.removeAnnotation(selectNode);


      return true;
    };

    _this.currentMovement = new _movement["default"](annotation, 0, _classPrivateFieldGet(_this, _boundRect).call(_this), _this.options); // this.selectAnnotation();
    // let dts = this.dataTemplate(tag, rect.x, rect.y,
    //     parseFloat(rect.x) + parseFloat(rect.width) + '%',
    //     parseFloat(rect.y) + parseFloat(rect.height) + '%')

    _this.currentMovement.updateData(_objectSpread({}, tag));

    _this.currentMovement.fetchData();

    _this.data.push(_this.currentMovement.data);

    _this.setTagForCurrentMovement(_this.currentMovement.data);

    _this.config.onAnnoAdded(_this.currentMovement.data, annotation); // this.config.onUpdated(this.dataSource());

  });

  _defineProperty(this, "dispatchEventToAnno", function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    // if (!e.target.classList.contains('annotation') &&
    // !e.target.classList.contains(`${PREFIX_RESIZE_DOT}`)) {
    //     eventTargetOnTransform = false;
    //   }
    var eventType = e.type; // console.log(`eventType=${eventType}`);

    if (eventType === _config.MOUSE_EVENT[6]) {
      _this.selectAnnotation();

      return;
    }

    var clientX = e.clientX,
        clientY = e.clientY;

    if (e.targetTouches && e.targetTouches.length > 0) {
      var touch = e.targetTouches[0];
      clientX = touch ? touch.clientX : undefined;
      clientY = touch ? touch.clientY : undefined;
    } // console.log('eventType', eventType)


    _classPrivateFieldSet(_this, _moveX, clientX); //- this.#boundRect().x;


    _classPrivateFieldSet(_this, _moveY, clientY); //- this.#boundRect().y;


    if (eventType === _config.MOUSE_EVENT[0] || eventType === _config.TOUCH_EVENT[0]) {
      _this.actionDown = true;

      _classPrivateFieldSet(_this, _lastX, _classPrivateFieldGet(_this, _moveX));

      _classPrivateFieldSet(_this, _lastY, _classPrivateFieldGet(_this, _moveY));

      if (typeof _classPrivateFieldGet(_this, _callback_handler) === 'function') {
        _classPrivateFieldGet(_this, _callback_handler).call(_this, true);
      } // eventTargetOnTransform = true;


      _classPrivateFieldGet(_this, _targetEventType).call(_this, e);
    } else if (eventType === _config.MOUSE_EVENT[1] || eventType === _config.MOUSE_EVENT[3] || eventType === _config.MOUSE_EVENT[5] || eventType === _config.TOUCH_EVENT[1] || eventType === _config.TOUCH_EVENT[3] || eventType === _config.TOUCH_EVENT[5]) {
      if (_this.currentMovement == null) {
        return true;
      }

      if (_this.actionDown) {
        if (_this.filterOutOfBounds(_classPrivateFieldGet(_this, _moveX), _classPrivateFieldGet(_this, _moveY))) {
          return;
        }

        _this.currentMovement.transform(_classPrivateFieldGet(_this, _moveX) - _classPrivateFieldGet(_this, _lastX), _classPrivateFieldGet(_this, _moveY) - _classPrivateFieldGet(_this, _lastY));

        _classPrivateFieldSet(_this, _lastX, _classPrivateFieldGet(_this, _moveX));

        _classPrivateFieldSet(_this, _lastY, _classPrivateFieldGet(_this, _moveY));
      }
    } else {
      if (typeof _classPrivateFieldGet(_this, _callback_handler) === 'function') {
        _classPrivateFieldGet(_this, _callback_handler).call(_this, false);
      } // eventTargetOnTransform = false;


      if (_this.actionDown) {
        _this.updateMovementData();

        _this.selectAnnotation();
      }

      _this.actionDown = false;
    }
  });

  _defineProperty(this, "removeSelectedAnnotation", function () {
    if (_this.currentMovement) {
      var cs = _this.currentMovement.currentNode.classList;
      cs.remove('selected');

      if (_this.options.blurOtherDots) {
        _this.currentMovement.currentNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
          node.classList.add('hidden');
        });
      }
    }
  });

  _defineProperty(this, "selectAnnotation", function () {
    var isUserinteracted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (_this.currentMovement) {
      var cs = _this.currentMovement.currentNode.classList;
      cs.add('selected');

      if (_this.options.blurOtherDots) {
        if (!_this.options.editable) {
          _this.currentMovement.currentNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
            if (node.classList.contains(_config.dotCls[8])) {
              node.classList.remove('hidden');
            } else {
              node.classList.add('hidden');
            }
          });

          return;
        }

        _this.currentMovement.currentNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
          node.classList.remove('hidden');
        });
      }

      if (!isUserinteracted) return;
      var node = _this.currentMovement.currentNode; // const ln = node.querySelector(`.${imageOpTag}`);
      // const tag_str = ln.innerText;
      // const tagAttr = ln.dataset;

      var selectData = _objectSpread({}, _this.currentMovement.data);

      _this.config.onAnnoSelected(selectData, node);
    }
  });

  _defineProperty(this, "selectMarkerByTagId", function (tagId) {
    var tag = _this.annotationContainer.querySelector("[data-id=\"".concat(tagId, "\"]"));

    if (tag) {
      var parentEl = tag.parentNode.parentNode.parentNode;

      _this.removeSelectedAnnotation();

      if (_this.currentMovement == null) {
        _this.currentMovement = new _movement["default"](parentEl, -1, _classPrivateFieldGet(_this, _boundRect).call(_this), _this.options);
      }

      var cData = _this.data.find(function (item) {
        return item.uuid == parentEl.dataset.uuid;
      });

      _this.currentMovement.data = cData;
      _this.currentMovement.currentNode = parentEl;
      _this.currentMovement.boundRect = _classPrivateFieldGet(_this, _boundRect).call(_this);
      _this.currentMovement.type = -1;

      _this.selectAnnotation(false);
    }
  });

  _classPrivateFieldInitSpec(this, _targetEventType, {
    writable: true,
    value: function value(e) {
      _this.removeSelectedAnnotation();

      var el = e.target;
      var parentEl = el.classList.contains('annotation') ? el : el.parentNode;

      if (_this.currentMovement == null) {
        _this.currentMovement = new _movement["default"](parentEl, 0, _classPrivateFieldGet(_this, _boundRect).call(_this), _this.options);
      }

      var cData = _this.data.find(function (item) {
        return item.uuid == parentEl.dataset.uuid;
      });

      _this.currentMovement.data = cData;
      _this.currentMovement.currentNode = parentEl;

      _classPrivateFieldSet(_this, _currentMovementDisabled, false);

      _this.currentMovement.boundRect = _classPrivateFieldGet(_this, _boundRect).call(_this);

      if (el.classList.contains(_config.dotCls[0])) {
        //top
        _this.currentMovement.type = 0;
      } else if (el.classList.contains(_config.dotCls[1])) {
        //bottom
        _this.currentMovement.type = 1;
      } else if (el.classList.contains(_config.dotCls[2])) {
        //left
        _this.currentMovement.type = 2;
      } else if (el.classList.contains(_config.dotCls[3])) {
        //right
        _this.currentMovement.type = 3;
      } else if (el.classList.contains(_config.dotCls[4])) {
        //top-left
        _this.currentMovement.type = 4;
      } else if (el.classList.contains(_config.dotCls[5])) {
        //top-right
        _this.currentMovement.type = 5;
      } else if (el.classList.contains(_config.dotCls[6])) {
        //bottom-left
        _this.currentMovement.type = 6;
      } else if (el.classList.contains(_config.dotCls[7])) {
        //bottom-right
        _this.currentMovement.type = 7;
      } else if (el.classList.contains('annotation')) {
        _this.currentMovement.type = -1;
      } else {
        // this.currentMovement = null;
        _classPrivateFieldSet(_this, _currentMovementDisabled, true);
      } // this.selectAnnotation();

    }
  });

  _defineProperty(this, "filterOutOfBounds", function (x, y) {
    return x >= _classPrivateFieldGet(_this, _boundRect).call(_this).x + _classPrivateFieldGet(_this, _boundRect).call(_this).width + 2 || y >= _classPrivateFieldGet(_this, _boundRect).call(_this).y + _classPrivateFieldGet(_this, _boundRect).call(_this).height + 2 || x < 5 || y < 5;
  });

  this.options = _objectSpread({}, _config.defaultConfig.options);
  this.config = _objectSpread({}, _config.defaultConfig);

  _classPrivateFieldSet(this, _callback_handler, callback_handler);

  this.annotationContainer = parentNode;

  _classPrivateFieldSet(this, _boundRect, boundRect);

  this.actionDown = false;
  this.currentMovement = null;
  this.data = [];
  var that = this;

  this.delEvent = function (e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      var currentMovement = that.currentMovement;

      if (currentMovement) {
        that.removeAnnotation(currentMovement.currentNode);
      }
    }
  };

  this.setConfigOptions(callback);
};

exports["default"] = ResizeAnnotation;