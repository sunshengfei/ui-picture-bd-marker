## 高仿百度AI图像物体检测标注控件

__HTML__ 基本结构
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
```

__CSS__ 默认样式
---
见bdmarker.scss

###用法

初始化marker

```
this.marker = mark ? mark :
      new BdAIMarker(
        document.querySelector('#annotate-44'),
        document.querySelector('.draft'),//草稿
        null,//可自定义画框逻辑
        {
          options: {
            blurOtherDots: true,
            blurOtherDotsShowTags: false,
            editable: true,
          },
          onDataRendered: () => {
            this.test_getDataset();
          },
          onUpdated: (data) => {
            console.log(data);
          },
        });
```
获取数据，设置当前选中的标签

```

this.marker.dataSource()

this.marker.setTag(tagString);
```

渲染数据

```

this.marker.renderData(data ? data : [
        {
          tag: 'flower',
          position: {
            x: 80,
            y: 109,
            x1: 260,
            y1: 260,
          },
        },
        {
          tag: 'purple',
          position: {
            x: 180,
            y: 159,
            x1: 360,
            y1: 360,
          },
        },
      ],
      { width: 700, height: 437 },
    );

```

