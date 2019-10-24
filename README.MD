## 高仿百度AI图像物体检测标注控件

效果图：

![](https://snackblogs.sagocloud.com/ibucket/vm_sample.jpg)

安装依赖

```
npm install ui-picture-bd-marker -D

```

源码仓库：[https://github.com/FRED5DON/ui-picture-bd-marker](https://github.com/FRED5DON/ui-picture-bd-marker)

文档地址 ：[https://vmarker.sagocloud.com/diy/](https://vmarker.sagocloud.com/diy/#upbm)

### ver1.3.8
---
1.修复一处删除操作后数据未刷新的bug


感谢（@mrlinjun）

### ver1.3.6
---
1.增加支持渲染值为百分比

### ver1.3.3
---
1.增加控制标签位置options参数
```
  tagLocation: 2 // 1内底部 2外底部 
```

### ver1.1.9
---
1.修复页面存在一个以上的控件出现的无法标注问题
2.修复动态变更只读问题
3.修复this问题

### ver1.1.6
---
1.增加options配置`boundReachPercent`,控制能达到边界点的百分比分子 取值0.0~100

### ver1.1.4更新说明
---
1. 增加数据反选标记框
2. 修改打标签及数据渲染需要的数据结构{id:,name:} -> {tag:,tagName:,[自定义属性:,...]}
3. 点击选框返回包含自定义数据以作区分
4. 修复打相同标签数据错乱问题
