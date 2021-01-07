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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ResizeAnnotation = function ResizeAnnotation(parentNode, boundRect) {
  var _this = this;

  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config.defaultConfig;
  var callback_handler = arguments.length > 3 ? arguments[3] : undefined;

  _classCallCheck(this, ResizeAnnotation);

  _defineProperty(this, "_event", function () {
    if (_this.options.supportDelKey) {
      document.addEventListener("keydown", _this.delEvent);
    } else {
      document.removeEventListener("keydown", _this.delEvent);
    }
  });

  _defineProperty(this, "_uiconstruct", function () {
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
      }
    } //


    if (_this.currentMovement && !_this.options.editable) {
      _this.currentMovement.moveNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
        if (node.classList.contains(_config.dotCls[8])) {
          node.classList.remove('hidden');
        } else {
          node.classList.add('hidden');
        }
      });
    }
  });

  _defineProperty(this, "setConfigOptions", function (newOptions) {
    _this.options = _objectSpread(_objectSpread({}, _this.options), newOptions.options);
    _this.rawConfig = _objectSpread(_objectSpread({}, _this.rawConfig), newOptions);

    _this._event();

    _this._uiconstruct();
  });

  _defineProperty(this, "dataTemplate", function (tag, x, y, x1, y1) {
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

  _defineProperty(this, "reset", function () {
    _this.data = [];
  });

  _defineProperty(this, "isValid", function (rect) {
    return rect && parseFloat(rect.width) > 1 && parseFloat(rect.height) > 1;
  });

  _defineProperty(this, "renderData", function () {
    var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      width: _this.boundRect().width,
      height: _this.boundRect().height
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

    _this.rawConfig.onAnnoDataFullLoaded();
  });

  _defineProperty(this, "dataSource", function () {
    return _this.data;
  });

  _defineProperty(this, "dataSourceOfTag", function (tagId, uuid) {
    for (var i = 0; i < _this.data.length; i++) {
      var value = _this.data[i];

      if (value.tag === tagId && value.uuid == uuid) {
        return value;
      }
    }
  });

  _defineProperty(this, "setTagForCurrentMovement", function (tagOb) {
    if (_this.currentMovement) {
      var node = _this.currentMovement.moveNode;
      var tag_str = '',
          tag_id = '';

      if (typeof tagOb === 'string') {
        tag_id = tag_str = tagOb;
      }

      var oldtag = node.querySelector(".".concat(_config.imageOpTag)).dataset.id;
      var constData = {};

      if (_typeof(tagOb) === 'object') {
        tag_str = tagOb['tagName'];
        tag_id = tagOb['tag'];
        constData = _objectSpread({}, tagOb);

        for (var k in tagOb) {
          node.querySelector(".".concat(_config.imageOpTag)).dataset[k] = tagOb[k];
        }
      }

      var uuid = node.dataset.uuid;
      node.querySelector(".".concat(_config.imageOpTag)).innerText = tag_str;

      for (var i = 0; i < _this.data.length; i++) {
        var value = _this.data[i];
        var oldValue = Object.assign({}, value);

        if (value.tag === oldtag && value.uuid === uuid) {
          value = _objectSpread(_objectSpread(_objectSpread({}, value), constData), {}, {
            tag: tag_id,
            tagName: tag_str
          });
          node.querySelector(".".concat(_config.imageOpTag)).dataset.id = tag_id;
          node.querySelector(".".concat(_config.imageOpTag)).dataset.name = tag_str;

          _this.rawConfig.onAnnoChanged(value, oldValue);
        }

        _this.data[i] = value;
      }

      _this.rawConfig.onUpdated(_this.dataSource());
    }
  });

  _defineProperty(this, "updateMovementData", function () {
    //获取tag
    if (_this.currentMovement == null) return;
    var node = _this.currentMovement.moveNode;
    var uuid = node.dataset.uuid;
    var tag = node.querySelector(".".concat(_config.imageOpTag)).dataset.id;
    var position = {
      x: node.style.left,
      y: node.style.top,
      x1: (parseFloat(node.style.width) + parseFloat(node.style.left)).toFixed(3) + '%',
      y1: (parseFloat(node.style.height) + parseFloat(node.style.top)).toFixed(3) + '%'
    }; //从原有的数据集查找该tag

    var changed = false;

    for (var i = 0; i < _this.data.length; i++) {
      var value = _this.data[i];
      var oldValue = Object.assign({}, value);

      if (value.tag === tag && value.uuid === uuid) {
        if (JSON.stringify(value.position) != JSON.stringify(position)) {
          value.position = position;
          _this.data[i] = value;
          changed = true;

          _this.rawConfig.onAnnoChanged(value, oldValue);
        }

        break;
      }
    }

    if (changed) {
      _this.rawConfig.onUpdated(_this.dataSource(), _this.currentMovement);
    }
  });

  _defineProperty(this, "_removeAnnotationEvent", function (e) {
    if (!_this.options.editable) return;
    var selectNode = e.currentTarget.parentNode.parentNode.parentNode;

    _this.removeAnnotation(selectNode);
  });

  _defineProperty(this, "removeAnnotation", function (node) {
    if (node) {
      var uuid = node.dataset.uuid; // const tag = node.querySelector(`.${imageOpTag}`).dataset.id;

      var value;

      for (var i = 0; i < _this.data.length; i++) {
        value = _this.data[i];

        if ( //value.tag === tag && 
        value.uuid === uuid) {
          if (_this.rawConfig.onAnnoRemoved(value)) {
            _this.data.splice(i, 1);
          }

          break;
        }
      }

      _this.rawConfig.onUpdated(_this.dataSource());

      node.remove();
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
    var uu = "".concat((0, _config.UUID)(16, 16));
    annotation.dataset.uuid = uu; // this.rawConfig

    var i = 0;
    var tagString, tagId;

    if (_typeof(tag) === 'object') {
      tagString = tag.tagName;
      tagId = tag.tag;
    } else if (typeof tag === 'string') {
      tagString = tag;
      tagId = tag;
    } else {
      tagString = '请选择或添加新标签';
      tagId = "temp@".concat(uu);
      tag = {
        tag: tagId,
        tagName: tagString
      };
    }

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
        trash.addEventListener('click', _this._removeAnnotationEvent, true);

        var _tag = document.createElement('span');

        _tag.dataset.name = tagString;
        _tag.className = "".concat(_config.imageOpTag);
        _tag.innerText = tagString;
        _tag.dataset.id = tagId;

        if (_this.options.trashPositionStart) {
          opContent.appendChild(trash);
          opContent.appendChild(_tag);
        } else {
          opContent.appendChild(_tag);
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

      _this.rawConfig.onAnnoContextMenu(ab, e.target, _this); // this.removeAnnotation(selectNode);


      return true;
    };

    _this.currentMovement = new _movement["default"](annotation, 0, _this.boundRect(), _this.options); // this.selectAnnotation();

    var dts = _this.dataTemplate(tag, rect.x, rect.y, parseFloat(rect.x) + parseFloat(rect.width) + '%', parseFloat(rect.y) + parseFloat(rect.height) + '%');

    var insertItem = _objectSpread(_objectSpread({}, dts), {}, {
      uuid: uu
    });

    _this.data.push(insertItem);

    _this.rawConfig.onAnnoAdded(insertItem, annotation);

    _this.rawConfig.onUpdated(_this.dataSource());
  });

  _defineProperty(this, "dragEventOn", function (e) {
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


    _this.moveX = clientX; //- this.boundRect().x;

    _this.moveY = clientY; //- this.boundRect().y;

    if (eventType === _config.MOUSE_EVENT[0] || eventType === _config.TOUCH_EVENT[0]) {
      _this.actionDown = true;
      _this.lastX = _this.moveX;
      _this.lastY = _this.moveY;

      if (typeof _this.callback_handler === 'function') {
        _this.callback_handler(true);
      } // eventTargetOnTransform = true;


      _this.targetEventType(e);
    } else if (eventType === _config.MOUSE_EVENT[1] || eventType === _config.MOUSE_EVENT[3] || eventType === _config.MOUSE_EVENT[5] || eventType === _config.TOUCH_EVENT[1] || eventType === _config.TOUCH_EVENT[3] || eventType === _config.TOUCH_EVENT[5]) {
      if (_this.currentMovement == null) {
        return true;
      }

      if (_this.actionDown) {
        if (_this.filterOutOfBounds(_this.moveX, _this.moveY)) {
          return;
        }

        _this.currentMovement.transform(_this.moveX - _this.lastX, _this.moveY - _this.lastY);

        _this.lastX = _this.moveX;
        _this.lastY = _this.moveY;
      }
    } else {
      if (typeof _this.callback_handler === 'function') {
        _this.callback_handler(false);
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
      var cs = _this.currentMovement.moveNode.classList;
      cs.remove('selected');

      if (_this.options.blurOtherDots) {
        _this.currentMovement.moveNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
          node.classList.add('hidden');
        });
      }
    }
  });

  _defineProperty(this, "selectAnnotation", function () {
    var isUserinteracted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (_this.currentMovement) {
      var cs = _this.currentMovement.moveNode.classList;
      cs.add('selected');

      if (_this.options.blurOtherDots) {
        if (!_this.options.editable) {
          _this.currentMovement.moveNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
            if (node.classList.contains(_config.dotCls[8])) {
              node.classList.remove('hidden');
            } else {
              node.classList.add('hidden');
            }
          });

          return;
        }

        _this.currentMovement.moveNode.querySelectorAll("[class*=".concat(_config.PREFIX_RESIZE_DOT, "]")).forEach(function (node) {
          node.classList.remove('hidden');
        });
      }

      if (!isUserinteracted) return;
      var node = _this.currentMovement.moveNode;
      var tag_str = node.querySelector(".".concat(_config.imageOpTag)).innerText;
      var tagAttr = node.querySelector(".".concat(_config.imageOpTag)).dataset;

      var selectData = _objectSpread(_objectSpread({}, tagAttr), _this.dataSourceOfTag(tagAttr.id, node.dataset.uuid));

      _this.rawConfig.onAnnoSelected(selectData, node);
    }
  });

  _defineProperty(this, "selectMarkerByTagId", function (tagId) {
    var tag = _this.annotationContainer.querySelector("[data-id=\"".concat(tagId, "\"]"));

    if (tag) {
      var markerAnnotation = tag.parentNode.parentNode.parentNode;

      _this.removeSelectedAnnotation();

      _this.currentMovement = new _movement["default"](markerAnnotation, -1, _this.boundRect(), _this.options);

      _this.selectAnnotation(false);
    }
  });

  _defineProperty(this, "targetEventType", function (e) {
    _this.removeSelectedAnnotation();

    var el = e.target;
    var parentEl = el.classList.contains('annotation') ? el : el.parentNode;

    if (el.classList.contains(_config.dotCls[0])) {
      //top
      _this.currentMovement = new _movement["default"](parentEl, 0, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[1])) {
      //bottom
      _this.currentMovement = new _movement["default"](parentEl, 1, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[2])) {
      //left
      _this.currentMovement = new _movement["default"](parentEl, 2, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[3])) {
      //right
      _this.currentMovement = new _movement["default"](parentEl, 3, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[4])) {
      //top-left
      _this.currentMovement = new _movement["default"](parentEl, 4, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[5])) {
      //top-right
      _this.currentMovement = new _movement["default"](parentEl, 5, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[6])) {
      //bottom-left
      _this.currentMovement = new _movement["default"](parentEl, 6, _this.boundRect(), _this.options);
    } else if (el.classList.contains(_config.dotCls[7])) {
      //bottom-right
      _this.currentMovement = new _movement["default"](parentEl, 7, _this.boundRect(), _this.options);
    } else if (el.classList.contains('annotation')) {
      _this.currentMovement = new _movement["default"](parentEl, -1, _this.boundRect(), _this.options);
    } else {
      _this.currentMovement = null;
    } // this.selectAnnotation();

  });

  _defineProperty(this, "filterOutOfBounds", function (x, y) {
    return x >= _this.boundRect().x + _this.boundRect().width + 2 || y >= _this.boundRect().y + _this.boundRect().height + 2 || x < 5 || y < 5;
  });

  this.options = _objectSpread({}, _config.defaultConfig.options);
  this.rawConfig = _objectSpread({}, _config.defaultConfig);
  this.callback_handler = callback_handler;
  this.annotationContainer = parentNode;
  this.boundRect = boundRect;
  this.actionDown = false;
  this.currentMovement = null;
  this.data = [];
  var that = this;

  this.delEvent = function (e) {
    if (e.keyCode === 8 || e.keyCode === 46) {
      var currentMovement = that.currentMovement;

      if (currentMovement) {
        that.removeAnnotation(currentMovement.moveNode);
      }
    }
  };

  this.setConfigOptions(callback);
};

exports["default"] = ResizeAnnotation;