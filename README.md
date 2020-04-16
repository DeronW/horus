# Horus

![eye](https://raw.githubusercontent.com/DeronW/horus/master/images/horus.jpg)

网页事件统计工具

环境要求说明

-   网页编码需要采用 utf-8
-   完整支持 PC 端, 不完整支持移动端，不完全支持微信内网页
-   hover 事件比较特殊, 需要手动设置, 只有给元素添加 `data-horus` 属性后, 才会记录 hover 事件

## 安装

1. 下载生产环境代码 (推荐下载当前最新版本)

    https://unpkg.com/@honour/horus@1.0.0-beta/dist/horus.min.js

2. 通过 npm 安装

    npm install @honour/horus

npm 项目地址：https://www.npmjs.com/package/@honour/horus

## 使用

### 用法一，下载独立版

```html
<script>
    !(function (path, config) {
        window["_FPP_Horus_Config"] = config;
        var t = document.createElement("script");
        t.async = 1;
        t.src = path;
        var tags = document.getElementsByTagName("script")[0];
        tags.parentNode.insertBefore(t, tags);
    })("//__js_url__", {
        project: "__PROJECT_NAME__",
        url: "__REPORT_TO__",
    });
</script>
```

### 用法二，使用编译版

```javascript
import Horus from "@honour/horus";

const $horus = new Horus({
    project: "__PROJECT_NAME__",
    url: "__REPORT_TO__",
});
// 如果需要打开自动监听, 需要打开一下方法
// $horus.start()

horus.occur("__EVENT_TYPE__", "__JSON_DATA__");
```

### 配置参数说明

| 字段           | 类型   | 说明                                                        |
| -------------- | ------ | ----------------------------------------------------------- |
| url (必填)     | string | 服务地址 ，上报信息的服务器地址(不能带有\?参数)             |
| project (必填) | string | 不同的项目配置不同名称                                      |
| alias          | string | 全局别名 ， 方便全局调用                                    |
| account_id     | string | 默认会从 cookie 取 "account_id"的值作为用户标识             |
| listen         | json   | 监听事件类型 ，默认监听 click 及 hover 事件，请勿修改该配置 |
| request_type   | string | 数据上报请求方式，默认 ajax，改为"image"则图片请求方式      |
| debug          | bool   | 调试选项，默认 false                                        |

### 抓取数据说明

#### 自动抓取范围

-   点击事件

#### 主动上报事件

```javascript
// 通过 CDN 引入lib的使用方式
// 变量别名是通过配置的 alias 参数生成

$horus.occur("event_name", "这是一段需要被记录的数据");
```

```javascript
// 通过 import 引入的lib使用方式
// 假设已经创建了上报对象 const $horus = new Horus({...config})
$horus.occur("event_name", "这是一段需要被记录的数据");
```

`event_name` 的详细内容参考底部 "事件类型"

#### 指定抓取范围

核心思路: 在最终渲染(无论是 SSR 还是 SPA,最终都会生成 HTML 的结构)的内容中, 没有能够明确区分每个元素的标记. 所以, 精细的统计功能需要通过给目标元素添加特殊标记来实现.

**标记说明**

目前支持 2 种标记方式, 均为在 HTML 中添加特殊属性

通用格式:

```html
<div ho-click="事件类型:说明文字" ho-hover="事件类型:说明文字">
    <!-- fragment -->
</div>
```

-   事件类型: 的详细内容参考底部 "事件类型"
-   说明文字: 附加说明, 可以不填

-   ho-click: 监听点击事件
-   ho-hover: 监听鼠标移入事件(很短时间内只会触发一次, 鼠标快速滑动经过的位置会被忽略)

例子:

```html
<div>
    <div
        ho-hover="solution_login_hover:鼠标移动到“刷脸登录”的hover状态"
        ho-click="financial_contact_top"
    >
        <!-- 只有事件名称, 描述可以为空 -->
        <a ho-click="product_compare_try:点击本页“申请测试”按钮">
            <button>这是一段文字</button>
        </a>
        ...other context
    </div>
</div>
```

### 上报数据示例

上报 JSON 格式数据，内容如下

```javascript
{
    time: 1504520237556, // ms
    project: "XXX-WEB",
    event: "click",
    properties: {
        cookie: "",
        user_brand: "",
        user_model: "",
        user_os: "",
        user_explorer: "",
        account_id: "xxxxxxxxxxx",
    }
    custom: {
        domain: 'www.domain.com',
        version: `Horus/0.1.0`,
        xpath: '',
        title: '标题',
        desc: '这是一段描述'
    }

}
```

### React Support

```javascript
class C extends React.Component {
    render() {
        return (
            <div>
                <div
                    ho:hover="HOVER_EVENT_NAME"
                    ho-click="CLICK_EVENT_NAME:TEXT_TITLE"
                >
                    <a ho-click="product_compare_try:点击本页“申请测试”按钮">
                        <button>这是一段文字</button>
                    </a>
                    <div
                        ho-hover="HOVER_EVENT_NAME"
                        ho:click="CLICK_EVENT_NAME"
                    >
                        Another field
                    </div>
                    {...data}
                </div>
            </div>
        );
    }
}
```

### Vue Support

```html
<template>
    <div>
        <button ho:click="CLICK_EVENT_NAME">Click</button>
        <button ho-click="CLICK_EVENT_NAME2">Click2</button>

        <button ho:hover="HOVER_EVENT_NAME">Hover</button>
        <button ho-hover="HOVER_EVENT_NAME2">Hover2</button>
    </div>
</template>
```

## 开发计划

-   [x] `click` 事件, 默认全部监听
-   [x] `hover` 事件**必须**绑定监听
-   [ ] `link` 事件, No plan
-   [ ] `scroll` 事件, TODO
-   [ ] 业务流程 事件, TODO
-   [x] React 的支持
-   [x] Vue 的支持

## 参考

事件类型 的值参考 需要自定义并写入 Wiki 中
