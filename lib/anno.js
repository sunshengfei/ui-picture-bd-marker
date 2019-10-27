// MIT License

// Copyright (c) 2018 FredDon

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _config = require('./config');

var _movement = require('./movement');

var _movement2 = _interopRequireDefault(_movement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResizeAnnotation = function ResizeAnnotation(parentNode, boundRect) {
    var _this = this;

    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config.defaultConfig;
    var callback_handler = arguments[3];

    _classCallCheck(this, ResizeAnnotation);

    this.setConfigOptions = function (newOptions) {
        _this.options = _extends({}, _this.options, newOptions.options);
        _this.rawConfig = _extends({}, _this.rawConfig, newOptions);
    };

    this.dataTemplate = function (tag, x, y, x1, y1) {
        if (!tag || !/^.+$/gi.test(tag)) {
            tag = {
                tag: 'temp@' + new Date().getTime()
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
        _this.data = [];
    };

    this.isValid = function (rect) {
        return rect && parseFloat(rect.width) > 1 && parseFloat(rect.height) > 1;
    };

    this.renderData = function () {
        var dataArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { width: _this.boundRect().width, height: _this.boundRect().height };

        if (dataArray instanceof Array && dataArray.length > 0) {
            dataArray.forEach(function (data, index, arr) {
                var rect = void 0;
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
        _this.rawConfig.onDataRendered();
    };

    this.dataSource = function () {
        return _this.data;
    };

    this.dataSourceOfTag = function (tagId, uuid) {
        for (var i = 0; i < _this.data.length; i++) {
            var value = _this.data[i];
            if (value.tag === tagId && value.uuid == uuid) {
                return value;
            }
        }
    };

    this.setTagForCurrentMovement = function (tagOb) {
        if (_this.currentMovement) {
            var node = _this.currentMovement.moveNode;
            var tag_str = '',
                tag_id = '';
            if (typeof tagOb === 'string') {
                tag_id = tag_str = tagOb;
            }
            var oldtag = node.querySelector('.' + _config.imageOpTag).dataset.id;
            var constData = {};
            if ((typeof tagOb === 'undefined' ? 'undefined' : _typeof(tagOb)) === 'object') {
                tag_str = tagOb['tagName'];
                tag_id = tagOb['tag'];
                constData = _extends({}, tagOb);
                for (var k in tagOb) {
                    node.querySelector('.' + _config.imageOpTag).dataset[k] = tagOb[k];
                }
            }
            var uuid = node.dataset.uuid;
            node.querySelector('.' + _config.imageOpTag).innerText = tag_str;
            for (var i = 0; i < _this.data.length; i++) {
                var value = _this.data[i];
                if (value.tag === oldtag && value.uuid === uuid) {
                    value = _extends({}, value, constData, {
                        tag: tag_id,
                        tagName: tag_str
                    });
                    value.tag = tag_id;
                    value.tagName = tag_str;
                    node.querySelector('.' + _config.imageOpTag).dataset.id = tag_id;
                    node.querySelector('.' + _config.imageOpTag).dataset.name = tag_str;
                }
                _this.data[i] = value;
            }
            _this.rawConfig.onUpdated(_this.dataSource());
        }
    };

    this.updateMovementData = function () {
        //获取tag
        if (_this.currentMovement == null) return;
        var node = _this.currentMovement.moveNode;
        var uuid = node.dataset.uuid;
        var tag = node.querySelector('.' + _config.imageOpTag).dataset.id;
        var position = {
            x: node.style.left,
            y: node.style.top,
            x1: (parseFloat(node.style.width) + parseFloat(node.style.left)).toFixed(3) + '%',
            y1: (parseFloat(node.style.height) + parseFloat(node.style.top)).toFixed(3) + '%'
        };
        //从原有的数据集查找该tag
        for (var i = 0; i < _this.data.length; i++) {
            var value = _this.data[i];
            if (value.tag === tag && value.uuid === uuid) {
                value.position = position;
            }
            _this.data[i] = value;
        }
        _this.rawConfig.onUpdated(_this.dataSource(), _this.currentMovement);
    };

    this.removeAnnotationEvent = function (e) {
        if (!_this.options.editable) return;
        var selectNode = e.currentTarget.parentNode.parentNode.parentNode;
        if (selectNode) {
            var node = selectNode;
            var uuid = node.dataset.uuid;
            // const tag = node.querySelector(`.${imageOpTag}`).dataset.id;
            for (var i = 0; i < _this.data.length; i++) {
                var value = _this.data[i];
                if ( //value.tag === tag && 
                value.uuid === uuid) {
                    _this.data.splice(i, 1);
                    break;
                }
            }
            _this.rawConfig.onUpdated(_this.dataSource());
        }
        e.currentTarget.parentNode.parentNode.parentNode.remove();
    };

    this.drawAnnotation = function (rect) {
        var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

        if (!_this.isValid(rect)) {
            return;
        }
        _this.removeSelectedAnnotation();
        //创建Annotation节点
        var annotation = document.createElement('div');
        annotation.className = _this.options.annotationClass + ' selected';
        annotation.style.position = 'absolute';
        annotation.style.top = rect.y;
        annotation.style.left = rect.x;
        annotation.style.width = rect.width;
        annotation.style.height = rect.height;
        //创建8个resizeDot
        var resizeDotClasses = {
            top: _config.PREFIX_RESIZE_DOT + ' top',
            bottom: _config.PREFIX_RESIZE_DOT + ' bottom',
            left: _config.PREFIX_RESIZE_DOT + ' left',
            right: _config.PREFIX_RESIZE_DOT + ' right',
            topLeft: _config.PREFIX_RESIZE_DOT + ' top-left',
            topRight: _config.PREFIX_RESIZE_DOT + ' top-right',
            bottomLeft: _config.PREFIX_RESIZE_DOT + ' bottom-left',
            bottomRight: _config.PREFIX_RESIZE_DOT + ' bottom-right',
            trash: 'g-image-op'
        };
        var uu = '' + (0, _config.UUID)(16, 16);
        annotation.dataset.uuid = uu;
        // this.rawConfig
        var i = 0;
        var tagString = void 0,
            tagId = void 0;
        if ((typeof tag === 'undefined' ? 'undefined' : _typeof(tag)) === 'object') {
            tagString = tag.tagName;
            tagId = tag.tag;
        } else if (typeof tag === 'string') {
            tagString = tag;
            tagId = tag;
        } else {
            tagString = '请选择或添加新标签';
            tagId = 'temp@' + uu;
            tag = {
                tag: tagId,
                tagName: tagString
            };
        }
        for (var prop in resizeDotClasses) {
            var resizeDot = document.createElement('div');
            if (i === 8) {
                resizeDot.className = (_this.options.blurOtherDotsShowTags ? '' : '' + _config.dotCls[i]) + ' ' + resizeDotClasses[prop];
                var opContent = document.createElement('div');
                opContent.className = 'g-image-op-content';
                if (_this.options.tagLocation == _config.defaultPositions.out_bottom) {
                    opContent.style.position = 'absolute';
                    opContent.style.bottom = null;
                } else {
                    opContent.style.position = null;
                }
                var trash = document.createElement('i');
                trash.className = 'g-image-op-del iconfont s-icon icon-trash s-icon-trash';
                trash.innerText = ' × ';
                trash.addEventListener('click', _this.removeAnnotationEvent, true);
                var _tag = document.createElement('span');
                _tag.dataset.name = tagString;
                _tag.className = '' + _config.imageOpTag;
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
                resizeDot.className = resizeDotClasses[prop] + ' ' + _config.dotCls[i] + ' ' + (_this.options.editable ? '' : 'hidden');
            }
            annotation.appendChild(resizeDot);
            i++;
        }
        //加事件
        _this.annotationContainer.appendChild(annotation);
        _this.currentMovement = new _movement2.default(annotation, 0, _this.boundRect(), _this.options);
        // this.selectAnnotation();
        var dts = _this.dataTemplate(tag, rect.x, rect.y, parseFloat(rect.x) + parseFloat(rect.width) + '%', parseFloat(rect.y) + parseFloat(rect.height) + '%');
        _this.data.push(_extends({}, dts, { uuid: uu }));
        _this.rawConfig.onUpdated(_this.dataSource());
        _this.rawConfig.onDrawOne(dts, _this.currentMovement);
    };

    this.dragEventOn = function (e) {
        // e.preventDefault();
        // e.stopPropagation();
        // if (!e.target.classList.contains('annotation') &&
        //     !e.target.classList.contains(`${PREFIX_RESIZE_DOT}`)) {
        //     eventTargetOnTransform = false;
        //   }
        var eventType = e.type;
        var clientX = e.clientX,
            clientY = e.clientY;
        _this.moveX = clientX; //- this.boundRect().x;
        _this.moveY = clientY; //- this.boundRect().y;
        if (eventType === _config.MOUSE_EVENT[0]) {
            _this.actionDown = true;
            _this.lastX = _this.moveX;
            _this.lastY = _this.moveY;
            if (typeof _this.callback_handler === 'function') {
                _this.callback_handler(true);
            }
            // eventTargetOnTransform = true;
            _this.targetEventType(e);
        } else if (eventType === _config.MOUSE_EVENT[1] || eventType === _config.MOUSE_EVENT[3] || eventType === _config.MOUSE_EVENT[5]) {
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
            }
            // eventTargetOnTransform = false;
            if (_this.actionDown) {
                _this.updateMovementData();
                _this.selectAnnotation();
            }
            _this.actionDown = false;
        }
    };

    this.removeSelectedAnnotation = function () {
        if (_this.currentMovement) {
            var cs = _this.currentMovement.moveNode.classList;
            cs.remove('selected');
            if (_this.options.blurOtherDots) {
                _this.currentMovement.moveNode.querySelectorAll('[class*=' + _config.PREFIX_RESIZE_DOT + ']').forEach(function (node) {
                    node.classList.add('hidden');
                });
            }
        }
    };

    this.selectAnnotation = function () {
        var isUserinteracted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        if (_this.currentMovement) {
            var cs = _this.currentMovement.moveNode.classList;
            cs.add('selected');
            if (_this.options.blurOtherDots) {
                if (!_this.options.editable) {
                    _this.currentMovement.moveNode.querySelectorAll('[class*=' + _config.PREFIX_RESIZE_DOT + ']').forEach(function (node) {
                        if (node.classList.contains(_config.dotCls[8])) {
                            node.classList.remove('hidden');
                        } else {
                            node.classList.add('hidden');
                        }
                    });
                    return;
                }
                _this.currentMovement.moveNode.querySelectorAll('[class*=' + _config.PREFIX_RESIZE_DOT + ']').forEach(function (node) {
                    node.classList.remove('hidden');
                });
            }
            if (!isUserinteracted) return;
            var node = _this.currentMovement.moveNode;
            var tag_str = node.querySelector('.' + _config.imageOpTag).innerText;
            var tagAttr = node.querySelector('.' + _config.imageOpTag).dataset;
            _this.rawConfig.onSelect(_extends({}, tagAttr, _this.dataSourceOfTag(tagAttr.id, node.dataset.uuid)));
        }
    };

    this.selectMarkerByTagId = function (tagId) {
        var tag = _this.annotationContainer.querySelector('[data-id="' + tagId + '"]');
        if (tag) {
            var markerAnnotation = tag.parentNode.parentNode.parentNode;
            _this.removeSelectedAnnotation();
            _this.currentMovement = new _movement2.default(markerAnnotation, -1, _this.boundRect(), _this.options);
            _this.selectAnnotation(false);
        }
    };

    this.targetEventType = function (e) {
        _this.removeSelectedAnnotation();
        var el = e.target;
        var parentEl = el.classList.contains('annotation') ? el : el.parentNode;
        if (el.classList.contains(_config.dotCls[0])) {
            //top
            _this.currentMovement = new _movement2.default(parentEl, 0, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[1])) {
            //bottom
            _this.currentMovement = new _movement2.default(parentEl, 1, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[2])) {
            //left
            _this.currentMovement = new _movement2.default(parentEl, 2, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[3])) {
            //right
            _this.currentMovement = new _movement2.default(parentEl, 3, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[4])) {
            //top-left
            _this.currentMovement = new _movement2.default(parentEl, 4, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[5])) {
            //top-right
            _this.currentMovement = new _movement2.default(parentEl, 5, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[6])) {
            //bottom-left
            _this.currentMovement = new _movement2.default(parentEl, 6, _this.boundRect(), _this.options);
        } else if (el.classList.contains(_config.dotCls[7])) {
            //bottom-right
            _this.currentMovement = new _movement2.default(parentEl, 7, _this.boundRect(), _this.options);
        } else if (el.classList.contains('annotation')) {
            _this.currentMovement = new _movement2.default(parentEl, -1, _this.boundRect(), _this.options);
        } else {
            _this.currentMovement = null;
        }
        // this.selectAnnotation();
    };

    this.filterOutOfBounds = function (x, y) {
        return x >= _this.boundRect().x + _this.boundRect().width + 2 || y >= _this.boundRect().y + _this.boundRect().height + 2 || x < 5 || y < 5;
    };

    this.options = _extends({}, _config.defaultConfig.options, callback.options);
    this.callback_handler = callback_handler;
    this.annotationContainer = parentNode;
    this.boundRect = boundRect;
    this.actionDown = false;
    this.currentMovement = null;
    this.rawConfig = _extends({}, _config.defaultConfig, callback);
    this.data = [];
}

//获取数据模板


//init
;

exports.default = ResizeAnnotation;