## 高仿百度AI图像物体检测标注控件

![](https://img.shields.io/github/license/sunshengfei/ui-picture-bd-marker) ![](https://img.shields.io/npm/v/ui-picture-bd-marker.svg?color=%23ff4400&style=popout)

效果图：

![](https://github.com/sunshengfei/ui-picture-bd-marker/blob/master/demo.png?raw=true)

安装依赖

```
npm install ui-picture-bd-marker -D

```

源码仓库：[https://github.com/sunshengfei/ui-picture-bd-marker](https://github.com/sunshengfei/ui-picture-bd-marker)

文档地址 ：[https://vmarker.sagocloud.com/diy/](https://vmarker.sagocloud.com/diy/#upbm)

### ver2.3.7

1. 取消标注区域最小限定，任意宽度都能进行标画和render
2. 如果使用`vue-picture-bd-marker`组件，支持长图模式，外部可以套div进行overflow，只需要在vue组件设置width和ratio组合值即可
   1. width:auto 容器宽度将会使用原有图像宽度
   2. ratio:0    使用原图像缩放比

### ver2.3.5

1. options增加`closable`是否可以关闭（删除）属性
如：
```
marker.setConfigOptions({
 options:{closable: false}
})
```
2. options增加`textComponent`，用于自定义标签UI显示,接受类型为`Element`
3. 移除不必要的属性

### ver2.3.3
---
1. 修复右键oncontextmenu事件，当鼠标在tag标签报错问题
2. onAnnoContextMenu事件的第二个参数（触发元素），修改为当前绑定oncontextmenu的元素，即 e.target 变为 e.currentTarget

### ver2.3.2
---
1. 修复在IE下部分ES2015方法兼容问题
2. 修复在React引用下UI显示不及时响应的问题

### ver2.3.0
---
1. 修复调用marker的`setConfigOptions`方法不及时生效问题
2. options中`supportDelKey`修改默认值为`false`
3. 移除config中过时的回调方法，如下：

```
    onDataRendered: function () { },
    onDrawOne: function () { },
    onSelect: function () { },
```


### ver2.1.0
---

1. 修复键盘删除失效问题
2. 增加Mobile支持
3. defaultConfig增加设备标识 （mouse | touch ，鼠标或指针设备|触摸设备）

```
options: {
   deviceType: 'both',//both | mouse | touch
}
```


### ver2.0.2 - beta版 (注意兼容性问题)
---

大范围更新
1. 补全事件回调,`defaultConfig`参数调整，详见文档。
    ```
    export const defaultConfig = {
    options: {
        blurOtherDots: true,
        blurOtherDotsShowTags: false,
        editable: true,
        showTags: true,//是否显示标签
        supportDelKey: true,//支持删除键
        tagLocation: 1,
        trashPositionStart: 0,
        boundReachPercent: 0.01,
        annotationClass: 'annotation',
    },
    onAnnoContextMenu: function (annoData, element, annoContext) { },//自定义右键菜单入口
    onAnnoRemoved: function (annoData, element) {
        return true
    },
    onAnnoAdded: function (insertItem, element) { //同onDrawOne
    },
    onAnnoChanged: function (newValue, oldValue) { },
    onAnnoDataFullLoaded: function () { },// 同onDataRendered
    onAnnoSelected: function (value, element) { },//同onSelect
    onUpdated: function () { },
    // region maybe desperated at the end of 2019  
    onDataRendered: function () { },
    onDrawOne: function () { },
    onSelect: function () { },
    // endregion
};
    ```
2. 优化性能问题。

### ver2.0.1
---
1. 重组结构，增加默认配置。
2. 修复图像宽高在某些情况下，在导致内部变量不更新的问题。
3. 支持图片高度超出屏幕后进行标注。
4. 重新编写VMarker项目中使用的API。
5. 修复bug


### ver1.3.8
---
1. 修复一处删除操作后数据未刷新的bug


感谢（@mrlinjun）

### ver1.3.6
---
1. 增加支持渲染值为百分比

### ver1.3.3
---
1. 增加控制标签位置options参数
```
  tagLocation: 2 // 1内底部 2外底部 
```

### ver1.1.9
---
1. 修复页面存在一个以上的控件出现的无法标注问题
2. 修复动态变更只读问题
3. 修复this问题

### ver1.1.6
---
1. 增加options配置`boundReachPercent`,控制能达到边界点的百分比分子 取值0.0~100

### ver1.1.4更新说明
---
1. 增加数据反选标记框
2. 修改打标签及数据渲染需要的数据结构{id:,name:} -> {tag:,tagName:,[自定义属性:,...]}
3. 点击选框返回包含自定义数据以作区分
4. 修复打相同标签数据错乱问题




如果看到了，来个微信打赏呗，随意~


<img width=300 src="https://vmarker.sagocloud.com/images/wx_zsm.jpg" />
