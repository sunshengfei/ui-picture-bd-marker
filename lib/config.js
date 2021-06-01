'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformDataArray = exports.positionP2S = exports.percentToSize = exports.UUID = exports.dotCls = exports.PREFIX_RESIZE_DOT = exports.imageOpContent = exports.imageOpTag = exports.defaultConfig = exports.defaultPositions = exports.TOUCH_EVENT = exports.MOUSE_EVENT = void 0;
var MOUSE_EVENT = ['mousedown', 'mousemove', 'mouseend', 'mouseout', 'mouseup', 'mouseleave', 'contextmenu'];
exports.MOUSE_EVENT = MOUSE_EVENT;
var TOUCH_EVENT = ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'touchup', 'touchleave'];
exports.TOUCH_EVENT = TOUCH_EVENT;
var defaultPositions = {
  bottom: 0x01,
  out_bottom: 0x02
};
exports.defaultPositions = defaultPositions;
var defaultConfig = {
  options: {
    deviceType: 'both',
    //both | mouse | touch
    blurOtherDots: false,
    blurOtherDotsShowTags: false,
    editable: true,
    showTags: true,
    closable: true,
    supportDelKey: false,
    tagLocation: defaultPositions.bottom,
    trashPositionStart: 0,
    boundReachPercent: 0.01,
    textComponent: function textComponent() {
      return undefined;
    },
    annotationClass: 'annotation'
  },
  onAnnoContextMenu: function onAnnoContextMenu(annoData, element, annoContext) {},
  onAnnoRemoved: function onAnnoRemoved(annoData, element) {
    return true;
  },
  onAnnoAdded: function onAnnoAdded(insertItem, element) {},
  onAnnoChanged: function onAnnoChanged(newValue, oldValue) {},
  onAnnoDataFullLoaded: function onAnnoDataFullLoaded() {},
  onAnnoSelected: function onAnnoSelected(value, element) {},
  onUpdated: function onUpdated(data, movement) {}
};
exports.defaultConfig = defaultConfig;
var imageOpTag = 'g-image-op-name';
exports.imageOpTag = imageOpTag;
var imageOpContent = 'g-image-op-content';
exports.imageOpContent = imageOpContent;
var PREFIX_RESIZE_DOT = 'resize-dot';
exports.PREFIX_RESIZE_DOT = PREFIX_RESIZE_DOT;
var dotCls = ["".concat(PREFIX_RESIZE_DOT, "-n"), "".concat(PREFIX_RESIZE_DOT, "-s"), "".concat(PREFIX_RESIZE_DOT, "-w"), "".concat(PREFIX_RESIZE_DOT, "-e"), "".concat(PREFIX_RESIZE_DOT, "-nw"), "".concat(PREFIX_RESIZE_DOT, "-ne"), "".concat(PREFIX_RESIZE_DOT, "-sw"), "".concat(PREFIX_RESIZE_DOT, "-se"), "".concat(PREFIX_RESIZE_DOT, "-tag-trash")];
exports.dotCls = dotCls;

var UUID = function UUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
      i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    // rfc4122, version 4 form
    var r; // rfc4122 requires these characters

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4'; // Fill in random data.  At i==19 set the high bits of clock sequence as
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

exports.UUID = UUID;

var percentToSize = function percentToSize(percent) {
  var baseDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.round(parseFloat(percent).toFixed(3) * baseDistance / 100);
};

exports.percentToSize = percentToSize;

var positionP2S = function positionP2S() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    x: '0%',
    y: '0%',
    x1: '0%',
    y1: '0%'
  };
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

exports.positionP2S = positionP2S;

var transformDataArray = function transformDataArray() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var baseWith = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var i = 0; i < data.length; i++) {
    var o = data[i];
    o.position = positionP2S(o.position, baseWith);
  }

  return data;
};

exports.transformDataArray = transformDataArray;