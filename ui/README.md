# 说明

该文件夹下保存的是一些在cms项目中我通常使用的界面组件

主要由以下几个框架组成:

1. vue 2.x
2. elementui 2.12.0

## 目录结构

```
.
├── components
│   └── lh-image.vue ── 图像组件+点击预览（elementui还支持懒加载等功能，此处并未添加）
└── README.md
```

## 一些想法及思考

1. 多页面用到的 api 当做全局函数嵌入，从而避免每个页面 import（参考koa反模式）;

__示例如下:__

```js
import Vue from "vue";
import { func } from "module";

/**
 * api 函数全局嵌入
 * 
 * Vue 内部调用方式：
 *  this.$api.module.func()
 */
Vue.prototype.$api = {
    module: {
        func
    }
};
```
