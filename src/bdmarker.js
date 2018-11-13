import { isArray } from "util";
import { setTimeout } from "timers";

'use strict';

const MOUSE_EVENT = [
  'mousedown',
  'mousemove',
  'mouseend',
  'mouseout',
  'mouseup',
  'mouseleave',
];
let drawCursorEvent = MOUSE_EVENT;
let eventTargetOnTransform = false;
const imageOpTag = 'g-image-op-name'
let options = {
  blurOtherDots: true,
  blurOtherDotsShowTags: false,
  editable: true,
  trashPositionStart: 0,
  boundReachPercent:0.01
};

const PREFIX_RESIZE_DOT = 'resize-dot';

const cls = [
  `${PREFIX_RESIZE_DOT}-n`,
  `${PREFIX_RESIZE_DOT}-s`,
  `${PREFIX_RESIZE_DOT}-w`,
  `${PREFIX_RESIZE_DOT}-e`,
  `${PREFIX_RESIZE_DOT}-nw`,
  `${PREFIX_RESIZE_DOT}-ne`,
  `${PREFIX_RESIZE_DOT}-sw`,
  `${PREFIX_RESIZE_DOT}-se`,
  `${PREFIX_RESIZE_DOT}-tag-trash`,
];

const UUID = (len, radix) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

const percentToSize = (percent, baseWith = 0) => {
  return parseFloat(percent)
    .toFixed(3) * baseWith / 100;
};

const positionP2S = (position = { x: '0%', y: '0%', x1: '0%', y1: '0%' }, baseWith = 0) => {
  for (let o in position) {
    position[o] = percentToSize(position[o], baseWith);
  }
  return position;
};

const transformDataArray = (data = [], baseWith = 0) => {
  for (let i = 0; i < data.length; i++) {
    let o = data[i];
    o.position = positionP2S(o.position, baseWith);
  }
  return data;
};

class Movement {

  constructor(node, type = -1, boundRect) {
    this.moveNode = node;
    this.type = type;
    this.boundRect = boundRect;
  }

  transform = (offsetX, offsetY) => {
    if (!options.editable) return;
    let parentEl = this.moveNode;
    const rawHeightp = parseFloat(parentEl.style.height);
    const rawWidthp = parseFloat(parentEl.style.width);
    const rawTop = parseFloat(parentEl.style.top);
    const rawLeft = parseFloat(parentEl.style.left);
    const heightOffset = 100 * offsetY / this.boundRect.height;
    const widthOffset = 100 * offsetX / this.boundRect.width;
    // console.log( `this.type=${this.type},rawHeightp=${rawHeightp},rawWidthp=${rawWidthp},rawTop=${rawTop},rawLeft=${rawLeft},heightOffset=${heightOffset},widthOffset=${widthOffset}`);
    if (rawTop + heightOffset < options.boundReachPercent || rawTop + heightOffset > (100-options.boundReachPercent)) {
      return;
    }
    if (this.type === 0) {
      //top
      if (rawHeightp - heightOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
    } else if (this.type === 1) {
      //bottom
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
    }
    else if (this.type === 2) {
      //left
      if (widthOffset + rawLeft < options.boundReachPercent || widthOffset + rawLeft >= rawWidthp + rawLeft) {
        return;
      }
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    }
    else if (this.type === 3) {
      //right
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    } else if (this.type === 4) {
      //top-left
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
    }
    else if (this.type === 5) {
      //top-right
      if (rawWidthp + widthOffset < options.boundReachPercent) {
        return;
      }
      if (rawHeightp - heightOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.top = (rawTop + heightOffset).toFixed(3) + '%';
      parentEl.style.height = (rawHeightp - heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';
    }
    else if (this.type === 6) {
      //bottom-left
      if (rawHeightp + heightOffset < options.boundReachPercent) {
        return;
      }
      if (rawWidthp - widthOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp - widthOffset).toFixed(3) + '%';
    }
    else if (this.type === 7) {
      //bottom-right
      if (rawHeightp + heightOffset < options.boundReachPercent) {
        return;
      }
      if (rawWidthp + widthOffset < options.boundReachPercent) {
        return;
      }
      parentEl.style.height = (rawHeightp + heightOffset).toFixed(3) + '%';
      parentEl.style.width = (rawWidthp + widthOffset).toFixed(3) + '%';

    } else if (this.type === -1) {
      // //move
      if (heightOffset + rawTop < options.boundReachPercent || heightOffset + rawTop + rawHeightp > (100-options.boundReachPercent)) {
        return;
      }
      if (widthOffset + rawLeft < options.boundReachPercent || widthOffset + rawLeft + rawWidthp > (100-options.boundReachPercent)) {
        return;
      }
      parentEl.style.top = (heightOffset + rawTop).toFixed(3) + '%';
      parentEl.style.left = (widthOffset + rawLeft).toFixed(3) + '%';
    }
  };

}


class ResizeAnnotation {

  static defaultConfig = {
    options: {},
    onDataRendered: function () { },
    onUpdated: function () { },
    onDrawOne: function () { },
    onSelect: function () { },
  };

  constructor(parentNode, boundRect, callback = ResizeAnnotation.defaultConfig) {
    options = Object.assign(options, callback.options);
    this.annotationContainer = parentNode;
    this.boundRect = boundRect;
    this.actionDown = false;
    this.currentMovement = null;
    this.callback = Object.assign(ResizeAnnotation.defaultConfig, callback);
    this.data = [];
    // this.renderData=this.renderData.bind(this);
  }

  //获取数据模板
  dataTemplate = (tag, x, y, x1, y1) => {
    if (!tag || !/^.+$/gi.test(tag)) {
      tag = {
        tag: `temp@${new Date().getTime()}`,
      };
    }
    return {
      ...tag,
      position: {
        x,
        y,
        x1,
        y1,
      },
    };
  };

  reset = () => {
    this.data = []
  }

  isValid = (rect) => {
    return rect && parseFloat(rect.width) > 1 && parseFloat(rect.height) > 1;
  };

  renderData = (
    dataArray = [], base = { width: this.boundRect.width, height: this.boundRect.height }) => {
    if (dataArray instanceof Array && dataArray.length > 0) {
      dataArray.forEach((data, index, arr) => {
        //currentValue => rect
        let rect = {
          x: (100 * data.position.x / base.width).toFixed(3) + '%',
          y: (100 * data.position.y / base.height).toFixed(3) + '%',
          width: (100 * (data.position.x1 - data.position.x) / base.width).toFixed(3) + '%',
          height: (100 * (data.position.y1 - data.position.y) / base.height).toFixed(3) + '%',
        };
        this.drawAnnotation(rect, data);
      });
    } else {
      this.reset();
    }
    this.callback.onDataRendered();
  };

  dataSource = () => {
    return this.data;
  };

  dataSourceOfTag = (tagId, uuid) => {
    for (let i = 0; i < this.data.length; i++) {
      let value = this.data[i];
      if (value.tag === tagId && value.uuid == uuid) {
        return (value);
      }
    }
  };


  setTagForCurrentMovement = (tagOb) => {
    if (this.currentMovement) {
      const node = this.currentMovement.moveNode;
      let tag_str = '', tag_id = '';
      if (typeof tagOb === 'string') {
        tag_id = tag_str = tagOb;
      }
      const oldtag = node.querySelector(`.${imageOpTag}`).dataset.id;
      if (typeof tagOb === 'object') {
        tag_str = tagOb['tagName']
        tag_id = tagOb['tag']
        for (let k in tagOb) {
          node.querySelector(`.${imageOpTag}`).dataset[k] = tagOb[k];
        }
      }
      let uuid = node.dataset.uuid;
      node.querySelector(`.${imageOpTag}`).innerText = tag_str;
      for (let i = 0; i < this.data.length; i++) {
        let value = this.data[i];
        if (value.tag === oldtag && value.uuid === uuid) {
          value.tag = tag_id;
          value.tagName = tag_str;
          node.querySelector(`.${imageOpTag}`).dataset.id = tag_id;
          node.querySelector(`.${imageOpTag}`).dataset.name = tag_str;
        }
        this.data[i] = value;
      }
      this.callback.onUpdated(this.dataSource());
    }
  };

  updateMovementData = () => {
    //获取tag
    if (this.currentMovement == null) return;
    const node = this.currentMovement.moveNode;
    let uuid = node.dataset.uuid;
    const tag = node.querySelector(`.${imageOpTag}`).dataset.id;
    let position = {
      x: node.style.left,
      y: node.style.top,
      x1: (parseFloat(node.style.width) + parseFloat(node.style.left)).toFixed(3) + '%',
      y1: (parseFloat(node.style.height) + parseFloat(node.style.top)).toFixed(3) + '%',
    };
    //从原有的数据集查找该tag
    for (let i = 0; i < this.data.length; i++) {
      let value = this.data[i];
      if (value.tag === tag && value.uuid === uuid) {
        value.position = position;
      }
      this.data[i] = value;
    }
    this.callback.onUpdated(this.dataSource(), this.currentMovement);
  };


  removeAnnotationEvent = (e) => {
    if (!options.editable) return;
    if (this.currentMovement) {
      const node = this.currentMovement.moveNode;
      let uuid = node.dataset.uuid;
      const tag = node.querySelector(`.${imageOpTag}`).dataset.id;
      for (let i = 0; i < this.data.length; i++) {
        let value = this.data[i];
        if (value.tag === tag && value.uuid === uuid) {
          this.data.splice(i, 1);
          break;
        }
      }
      this.callback.onUpdated(this.dataSource());
    }
    e.target.parentNode.parentNode.parentNode.remove();
    // e.parentNode.parentNode.removeFromParent();
  };

  //init
  drawAnnotation = (rect, tag = void 0) => {
    if (!this.isValid(rect)) return;
    this.removeSelectedAnnotation();
    //创建Annotation节点
    let annotation = document.createElement('div');
    annotation.className = 'annotation selected';
    annotation.style.position = 'absolute';
    annotation.style.top = rect.y;
    annotation.style.left = rect.x;
    annotation.style.width = rect.width;
    annotation.style.height = rect.height;
    //创建8个resizeDot
    const resizeDotClasses = {
      top: `${PREFIX_RESIZE_DOT} top`,
      bottom: `${PREFIX_RESIZE_DOT} bottom`,
      left: `${PREFIX_RESIZE_DOT} left`,
      right: `${PREFIX_RESIZE_DOT} right`,
      topLeft: `${PREFIX_RESIZE_DOT} top-left`,
      topRight: `${PREFIX_RESIZE_DOT} top-right`,
      bottomLeft: `${PREFIX_RESIZE_DOT} bottom-left`,
      bottomRight: `${PREFIX_RESIZE_DOT} bottom-right`,
      trash: 'g-image-op',
    };
    let uu = `${UUID(16, 16)}`;
    annotation.dataset.uuid = uu;
    // this.callback
    let i = 0;
    let tagString, tagId;
    if (typeof tag === 'object') {
      tagString = tag.tagName;
      tagId = tag.tag;
    }
    else if (typeof tag === 'string') {
      tagString = tag;
      tagId = tag;
    } else {
      tagString = '请选择或添加新标签';
      tagId = `temp@${uu}`;
      tag = {
        tag: tagId,
        tagName: tagString
      }
    }
    for (let prop in resizeDotClasses) {
      let resizeDot = document.createElement('div');
      if (i === 8) {
        resizeDot.className = `${options.blurOtherDotsShowTags
          ? ''
          : `${cls[i]}`} ${resizeDotClasses[prop]}`;
        let opContent = document.createElement('div');
        opContent.className = 'g-image-op-content';
        let trash = document.createElement('i');
        trash.className = 'g-image-op-del iconfont s-icon icon-trash s-icon-trash';
        trash.innerText = ' × ';
        trash.addEventListener('click', this.removeAnnotationEvent, true);
        let tag = document.createElement('span');
        tag.dataset.name = tagString;
        tag.className = `${imageOpTag}`;
        tag.innerText = tagString;
        tag.dataset.id = tagId;
        if (options.trashPositionStart) {
          opContent.appendChild(trash);
          opContent.appendChild(tag);
        } else {
          opContent.appendChild(tag);
          opContent.appendChild(trash);
        }
        resizeDot.appendChild(opContent);
      } else {
        resizeDot.className = `${resizeDotClasses[prop]} ${cls[i]} ${options.editable
          ? ''
          : 'hidden'}`;
      }
      annotation.appendChild(resizeDot);
      i++;
    }
    //加事件
    this.annotationContainer.appendChild(annotation);
    this.currentMovement = new Movement(annotation, 0, this.boundRect);
    // this.selectAnnotation();
    let dts = this.dataTemplate(tag, rect.x, rect.y,
      parseFloat(rect.x) + parseFloat(rect.width) + '%',
      parseFloat(rect.y) + parseFloat(rect.height) + '%')
    this.data.push({ ...dts, uuid: uu });
    this.callback.onUpdated(this.dataSource());
    this.callback.onDrawOne(dts, this.currentMovement)
  };

  dragEventOn = (e) => {
    // e.preventDefault();
    // e.stopPropagation();
    const eventType = e.type;
    let clientX = e.clientX,
      clientY = e.clientY;
    this.moveX = clientX;//- this.boundRect.x;
    this.moveY = clientY;//- this.boundRect.y;
    if (eventType === MOUSE_EVENT[0]) {
      this.actionDown = true;
      this.lastX = this.moveX;
      this.lastY = this.moveY;
      eventTargetOnTransform = true;
      this.targetEventType(e);
    } else if (eventType === MOUSE_EVENT[1] || eventType === MOUSE_EVENT[3] || eventType ===
      MOUSE_EVENT[5]) {
      if (this.currentMovement == null) {
        return true;
      }
      if (this.actionDown) {
        if (this.filterOutOfBounds(this.moveX, this.moveY)) return;
        this.currentMovement.transform(this.moveX - this.lastX, this.moveY - this.lastY);
        this.lastX = this.moveX;
        this.lastY = this.moveY;
      }
    } else {
      if (this.actionDown) {
        this.updateMovementData();
        this.selectAnnotation();
      }
      this.actionDown = false;
      eventTargetOnTransform = false;
    }
    // console.log(eventType);
  };

  removeSelectedAnnotation = () => {
    if (this.currentMovement) {
      let cs = this.currentMovement.moveNode.classList;
      cs.remove('selected');
      if (options.blurOtherDots) {
        this.currentMovement.moveNode.querySelectorAll(`[class*=${PREFIX_RESIZE_DOT}]`)
          .forEach((node) => {
            node.classList.add('hidden');
          });
      }
    }
  };

  selectAnnotation = (isUserinteracted = true) => {
    if (this.currentMovement) {
      let cs = this.currentMovement.moveNode.classList;
      cs.add('selected');
      if (options.blurOtherDots) {
        if (!options.editable) {
          this.currentMovement.moveNode.querySelectorAll(`[class*=${PREFIX_RESIZE_DOT}]`)
            .forEach((node) => {
              if (node.classList.contains(cls[8])) {
                node.classList.remove('hidden');
              } else {
                node.classList.add('hidden');
              }
            });
          return;
        }
        this.currentMovement.moveNode.querySelectorAll(`[class*=${PREFIX_RESIZE_DOT}]`)
          .forEach((node) => {
            node.classList.remove('hidden');
          });
      }
      if (!isUserinteracted) return;
      const node = this.currentMovement.moveNode;
      const tag_str = node.querySelector(`.${imageOpTag}`).innerText;
      const tagAttr = node.querySelector(`.${imageOpTag}`).dataset;
      this.callback.onSelect({
        ...tagAttr,
        ...this.dataSourceOfTag(tagAttr.id,node.dataset.uuid)
      })
    }
  };

  selectMarkerByTagId = (tagId) => {
    let tag = this.annotationContainer.querySelector(`[data-id="${tagId}"]`);
    if (tag) {
      let markerAnnotation = tag.parentNode.parentNode.parentNode
      this.removeSelectedAnnotation();
      this.currentMovement = new Movement(markerAnnotation, -1, this.boundRect);
      this.selectAnnotation(false);
    }
  }


  targetEventType = (e) => {
    this.removeSelectedAnnotation();
    let el = e.target;
    let parentEl = el.classList.contains('annotation') ? el : el.parentNode;
    if (el.classList.contains(cls[0])) {
      //top
      this.currentMovement = new Movement(parentEl, 0, this.boundRect);
    } else if (el.classList.contains(cls[1])) {
      //bottom
      this.currentMovement = new Movement(parentEl, 1, this.boundRect);
    }
    else if (el.classList.contains(cls[2])) {
      //left
      this.currentMovement = new Movement(parentEl, 2, this.boundRect);
    }
    else if (el.classList.contains(cls[3])) {
      //right
      this.currentMovement = new Movement(parentEl, 3, this.boundRect);
    } else if (el.classList.contains(cls[4])) {
      //top-left
      this.currentMovement = new Movement(parentEl, 4, this.boundRect);
    }
    else if (el.classList.contains(cls[5])) {
      //top-right
      this.currentMovement = new Movement(parentEl, 5, this.boundRect);
    }
    else if (el.classList.contains(cls[6])) {
      //bottom-left
      this.currentMovement = new Movement(parentEl, 6, this.boundRect);
    }
    else if (el.classList.contains(cls[7])) {
      //bottom-right
      this.currentMovement = new Movement(parentEl, 7, this.boundRect);
    } else if (el.classList.contains('annotation')) {
      this.currentMovement = new Movement(parentEl, -1, this.boundRect);
    } else {
      this.currentMovement = null;
    }
    // this.selectAnnotation();
  };


  filterOutOfBounds = (x, y) => {
    return (
      x >= this.boundRect.x + this.boundRect.width + 2 ||
      y >= this.boundRect.y + this.boundRect.height + 2 ||
      x < 5 || y < 5
    );
  };

}


class BdAIMarker {

  constructor(layer, draft, resizeAnnotation, options = {}) {
    if (typeof options !== 'object') {
      throw 'Please provide a callback Config for BdAIMarker';
    }
    if (layer) {
      this.layer = layer;
      this.draft = draft;
      this.actionDown = false;
      this.draftRect = {};
      this.anchorX = -1;
      this.anchorY = -1;
      this.boundRect = () => {
        return layer.getBoundingClientRect();
      };
      this.resizeAnnotation = resizeAnnotation ? resizeAnnotation : new ResizeAnnotation(
        draft.parentNode, this.boundRect(), options);
      drawCursorEvent.forEach((currentValue, index, arr) => {
        layer.addEventListener(currentValue, (e) => {
          let x = e.clientX,
            y = e.clientY;
          this.mouseEventHandler(e, x, y);
        }, true);
      });
    }
  }

  mouseEventHandler = (e, clientX, clientY, boundRect = this.boundRect()) => {
    let eventType = e.type;
    this.moveX = clientX - boundRect.x;
    this.moveY = clientY - boundRect.y;
    if (eventTargetOnTransform) {
      this.resizeAnnotation.dragEventOn(e);
      return;
    }
    if (eventType === MOUSE_EVENT[0]) {
      if (e.target.classList.contains('annotation') ||
        e.target.classList.contains(`${PREFIX_RESIZE_DOT}`)) {
        eventTargetOnTransform = true;
        this.resizeAnnotation.dragEventOn(e);
        return;
      }
      if (this.actionDown) {
        this.dragTo(this.moveX, this.moveY);
        return;
      }
      this.actionDown = true;
      this.anchorX = this.moveX;
      this.anchorY = this.moveY;
      this.resetDraft();
      this.anchorAt(this.anchorX, this.anchorY);
    } else if (eventType === MOUSE_EVENT[1]) {
      if (this.actionDown) {
        this.dragTo(this.moveX, this.moveY);
      }
    } else if (eventType === MOUSE_EVENT[4]) {
      // console.log(`eventType=${eventType}`);
      // console.log(this.draftRect);
      // if (this.actionDown && this.callback) {
      //   this.callback.call(null, this.draftRect);
      // }
      if (this.actionDown && this.resizeAnnotation) {
        this.resizeAnnotation.drawAnnotation(this.draftRect);
        this.resetDraft();
      }
      this.actionDown = false;
    } else {
      if (this.actionDown && this.filterOutOfBounds(this.moveX, this.moveY)) {
        // console.log(`eventType=${eventType}`);
        // console.log(this.draftRect);
        if (this.resizeAnnotation) {
          this.resizeAnnotation.drawAnnotation(this.draftRect);
          this.resetDraft();
        }
        this.actionDown = false;
      }
    }
  };


  //  更新定位点
  anchorAt = (x, y) => {
    if (!options.editable) return;
    this.draft.style.display = '';
    if (this.moveX < x) {
      this.draft.style.right = 100 * Math.abs(this.boundRect().width - x) / this.boundRect().width +
        '%';
      this.draft.style.left = '';
      this.draftRect = Object.assign(this.draftRect,
        {
          x: (100 * Math.abs(this.moveX) / this.boundRect().width).toFixed(3) + '%',
        });
    } else {
      this.draft.style.left = (100 * Math.abs(x) / this.boundRect().width).toFixed(3) + '%';
      this.draft.style.right = '';
      this.draftRect = Object.assign(this.draftRect,
        {
          x: (100 * Math.abs(x) / this.boundRect().width).toFixed(3) + '%',
        });
    }
    if (this.moveY < y) {
      this.draft.style.bottom = (100 * Math.abs(this.boundRect().height - y) /
        this.boundRect().height).toFixed(3) +
        '%';
      this.draft.style.top = '';
      this.draftRect = Object.assign(this.draftRect,
        {
          y: (100 * Math.abs(this.moveY) / this.boundRect().height).toFixed(3) + '%',
        });
    } else {
      this.draft.style.top = (100 * Math.abs(y) / this.boundRect().height).toFixed(3) + '%';
      this.draft.style.bottom = '';
      this.draftRect = Object.assign(this.draftRect,
        {
          y: (100 * Math.abs(y) / this.boundRect().height).toFixed(3) + '%',
        });
    }
  };

  filterOutOfBounds = (x, y) => {
    return (
      x >= this.boundRect().x + this.boundRect().width + 2 ||
      y >= this.boundRect().y + this.boundRect().height + 2 ||
      x < 5 || y < 5
    );
  };

  resetDraft = () => {
    //reset
    this.draftRect = { x: -1, y: -1, width: 0, height: 0 };
    this.draft.style.width = '0%';
    this.draft.style.height = '0%';
  };

  /**
   * 清空数据
   */
  clearAll = () => {
    let annotations = this.layer.querySelectorAll('div.annotation');
    annotations.forEach((item) => {
      item.remove()
    })
    this.renderData(void 0)
  };

  dragTo = (x, y) => {
    if (!options.editable) return;
    if (this.filterOutOfBounds(x, y)) {
      this.actionDown = false;
    }
    this.anchorAt(this.anchorX, this.anchorY);
    let widthRatio = (100 * Math.abs(x - this.anchorX) / this.boundRect().width).toFixed(3);
    let heightRatio = (100 * Math.abs(y - this.anchorY) / this.boundRect().height).toFixed(3);
    this.draftRect = Object.assign(this.draftRect,
      {
        width: widthRatio + '%',
        height: heightRatio + '%',
      });
    this.draft.style.width = this.draftRect.width;
    this.draft.style.height = this.draftRect.height;
  };


  /**
   * 渲染数据
   */
  renderData = (dataArray = [], base) => {
    let ra = this.resizeAnnotation;
    if (ra) {
      ra.renderData(dataArray, base);
    }
  };

  /**
   * 打标签
   * {
   * id:'',
   * name:'',
   * }
   */
  setTag = (tag) => {
    if (this.resizeAnnotation && tag) {
      this.resizeAnnotation.setTagForCurrentMovement(tag);
    }
  };

  selectMarkerByTagId = (tagId) => {
    if (tagId) {
      this.resizeAnnotation.selectMarkerByTagId(tagId);
    }
  };

  /**
   * 获取所有数据
   */
  dataSource = () => {
    if (this.resizeAnnotation) {
      return this.resizeAnnotation.dataSource();
    }
    return void 0;
  };

  /**
   * 获取某个标签的数据
   */
  dataForTag = (tagId, uuid) => {
    return this.resizeAnnotation.dataSourceOfTag(tagId, uuid);
  }
}

export {
  ResizeAnnotation,
  BdAIMarker,
  UUID,
  positionP2S,
  transformDataArray,
};
