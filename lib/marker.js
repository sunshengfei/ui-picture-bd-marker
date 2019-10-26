'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bdmarker = require('./bdmarker');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PictureMarker = function PictureMarker(parentEl, draftEl, configs) {
  _classCallCheck(this, PictureMarker);

  _initialiseProps.call(this);

  this.marker = this._makeMarker(parentEl, draftEl, configs);
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this._makeMarker = function (parentEl, draftEl, configs) {
    return new _bdmarker.BdAIMarker(parentEl, draftEl, null, configs);
  };

  this.updateConfig = function (configs) {
    _this.marker.setConfigOptions(configs);
  };

  this.getMarker = function () {
    return _this.marker;
  };

  this.setTag = function () {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _this.marker.setTag(tag);
  };

  this.renderData = function (data, wihe) {
    _this.marker.renderData(data, wihe);
  };

  this.getData = function () {
    return _this.marker.dataSource();
  };

  this.clearData = function () {
    _this.marker.clearAll();
  };

  this.mapDataPercent2Real = function (dataArray, baseW, baseH) {
    return dataArray.map(function (item) {
      item.position = (0, _bdmarker.positionP2S)(item.position, baseW, baseH);
      return item;
    });
  };
};

exports.default = PictureMarker;