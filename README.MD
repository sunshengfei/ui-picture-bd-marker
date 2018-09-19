## 高仿百度AI图像物体检测标注控件

效果图：

![](https://github.com/FRED5DON/ui-picture-bd-marker/raw/master/demo.jpeg)

安装依赖

```
npm install ui-picture-bd-marker -D

```

源码仓库：[https://github.com/FRED5DON/ui-picture-bd-marker](https://github.com/FRED5DON/ui-picture-bd-marker)


Vue中使用举例

---

```
<template>
  <div class="dataset-annotate__body">
      <div class="g-image" style="width: 700px; height: 460px; position: relative; overflow: hidden;">
        <img
          data-ready="1"
          src="http://ai.baidu.com/easydl/entity/raw?datasetId=10012&id=a41f2649f8650ce164814866897a0ed0ba5528cb3d4edccaf24f7e4271d5a072"
          style="display: block; position: absolute; user-select: none; width: 700px; height: 437.5px">
        <div id="annotate-44"
             style="user-select: none; position: absolute; width: 700px; height: 437.5px; cursor: crosshair; left: 0px; top: 11.25px;">
          <div class="draft"
               style="position: absolute;user-select: none;display: none;background-color: rgba(1,0,0,0.5);"></div>
        </div>
      </div>
  </div>
</template>

<script>
  import { MUTester } from '../markUii_tester';
  import 'ui-picture-bd-marker/styles/bdmarker.scss';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        marker: void 0
      };
    },
    mounted() {
      this.event_on_draw();
    },
    methods: {
      event_on_draw: () => {
        let mt = new MUTester(void 0);
        mt.doTest();
      }
    }
  };
</script>

</template>

```

此处`markUii_tester `为测试类，内容如下：

```
'use strict';

import {
  ResizeAnnotation,
  BdAIMarker,
  UUID,
  positionP2S,
  transformDataArray,
} from 'ui-picture-bd-marker';

class MUTester {

  constructor(mark) {
    this.marker = mark ? mark :
      new BdAIMarker(
        document.querySelector('#annotate-44'),
        document.querySelector('.draft'),
        null,
        {
          options: {
            blurOtherDots: true,
            blurOtherDotsShowTags: false,
            editable: true,
            trashPositionStart:1,
          },
          onDataRendered: () => {
            this.test_getDataset();
          },
          onUpdated: (data) => {
            console.log(data);
          },
        });
  }

  doTest = () => {
    this.test_renderData();
    setTimeout(() => {
      this.test_setTag('Fred');
    }, 2000);

  };


  test_renderData = (data) => {
    this.marker.renderData(data ? data : [
        {
          tag: 'Diamond',
          position: {
            x: 350,
            y: 306,
            x1: 377,
            y1: 334,
          },
        },
        {
          tag: 'Bob',
          position: {
            x: 30,
            y: 100,
            x1: 240,
            y1: 400,
          },
        },
      ],
      { width: 700, height: 437 },
    );
  };

  test_setTag = (tagString) => {
    this.marker.setTag(tagString);
  };


  test_getDataset = () => {
    console.log(this.marker.dataSource());
  };
}

export {
  MUTester,
};


```

