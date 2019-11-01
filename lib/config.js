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
var MOUSE_EVENT = exports.MOUSE_EVENT = ['mousedown', 'mousemove', 'mouseend', 'mouseout', 'mouseup', 'mouseleave', 'contextmenu'];

var defaultPositions = exports.defaultPositions = {
    bottom: 0x01,
    out_bottom: 0x02
};

var defaultConfig = exports.defaultConfig = {
    options: {
        blurOtherDots: true,
        blurOtherDotsShowTags: false,
        editable: true,
        showTags: true,
        supportDelKey: true,
        tagLocation: defaultPositions.bottom,
        trashPositionStart: 0,
        boundReachPercent: 0.01,
        annotationClass: 'annotation'
    },
    onAnnoContextMenu: function onAnnoContextMenu(annoData, element, annoContext) {
        console.log('onAnnoContextMenu');
    },
    onAnnoRemoved: function onAnnoRemoved(annoData, element) {
        console.log('onAnnoRemoved');
        return true;
    },
    onAnnoAdded: function onAnnoAdded(insertItem, element) {
        console.log('onAnnoAdded');
    },
    onAnnoChanged: function onAnnoChanged(newValue, oldValue) {
        console.log('onAnnoChanged');
    },
    onAnnoDataFullLoaded: function onAnnoDataFullLoaded() {
        console.log('onAnnoDataFullLoaded');
    },
    onAnnoSelected: function onAnnoSelected(value, element) {
        console.log('onAnnoSelected');
    },
    onUpdated: function onUpdated() {
        console.log('onUpdated');
    },
    // region maybe desperated at the end of 2019  
    onDataRendered: function onDataRendered() {},
    onDrawOne: function onDrawOne() {},
    onSelect: function onSelect() {}
    // endregion
};

var imageOpTag = exports.imageOpTag = 'g-image-op-name';

var PREFIX_RESIZE_DOT = exports.PREFIX_RESIZE_DOT = 'resize-dot';

var dotCls = exports.dotCls = [PREFIX_RESIZE_DOT + '-n', PREFIX_RESIZE_DOT + '-s', PREFIX_RESIZE_DOT + '-w', PREFIX_RESIZE_DOT + '-e', PREFIX_RESIZE_DOT + '-nw', PREFIX_RESIZE_DOT + '-ne', PREFIX_RESIZE_DOT + '-sw', PREFIX_RESIZE_DOT + '-se', PREFIX_RESIZE_DOT + '-tag-trash'];

var UUID = function UUID(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i = void 0;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        // rfc4122, version 4 form
        var r = void 0;
        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
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
    var baseDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return Math.round(parseFloat(percent).toFixed(3) * baseDistance / 100);
};

var positionP2S = function positionP2S() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: '0%', y: '0%', x1: '0%', y1: '0%' };
    var baseWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
    var baseHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

    for (var o in position) {
        if (o.startsWith('x')) {
            position[o] = percentToSize(position[o], baseWith);
        } else {
            position[o] = percentToSize(position[o], baseHeight);
        }
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

exports.UUID = UUID;
exports.percentToSize = percentToSize;
exports.positionP2S = positionP2S;
exports.transformDataArray = transformDataArray;