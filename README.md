
# Horus

![eye](https://raw.githubusercontent.com/FaceFE/horus/master/images/horus.jpg)

网页统计工具

### Test

    npm run test

代码库测试(部分覆盖)

### Requirement

* 网页编码需要采用 utf-8
* 完整支持PC端, 不完整支持移动端
* 需要设置 account_id
* hover 事件比较特殊, 需要手动设置, 只有给元素添加 ``data-horus`` 属性后, 才会记录 hover 事件

* [x] ``click`` 事件, 默认全部监听
* [x] ``hover`` 事件**必须**绑定监听
* [ ] ``link`` 事件, TODO
* [ ] ``scroll`` 事件, TODO
* [ ] 业务流程 事件, TODO
* [ ] React / Vue 支持, TODO

## Installation

* 下载生产环境代码 (推荐下载当前最新版本)

https://raw.githubusercontent.com/HonourFE/horus/master/horus.min.js

* 通过 npm 安装

> npm install @facepp/horus

https://www.npmjs.com/package/@facepp/horus


### 用法一

```html
<script>
!function (path, config) {
    window['_FPP_Horus_Config'] = config;
    var t = document.createElement("script");
    t.async = 1;
    t.src = path;
    var tags = document.getElementsByTagName("script")[0];
    tags.parentNode.insertBefore(t, tags);
}("//__js_url__", {
    project: '__PROJECT_NAME__',
    url: '__REPORT_TO__'
});
</script>
```

### 用法二

```javascript

    import Horus from '@facepp/horus'

    const $horus = new Horus({
        project: '__PROJECT_NAME__',
        url: '__REPORT_TO__'
    })
    // 如果需要打开自动监听, 需要打开一下方法
    // $horus.start()

    horus.occur('__EVENT_TYPE__', '__JSON_DATA__')

```

### 配置参数说明

javascript文件区分国内国外的加载地址

* 国内加载地址[https://bj-qa-test-asset.oss-cn-beijing.aliyuncs.com/javascripts/horus-0.0.6.min.js](https://bj-qa-test-asset.oss-cn-beijing.aliyuncs.com/javascripts/horus-0.0.6.min.js)
* 国外加载地址 [https://bj-qa-test-asset.oss-cn-beijing.aliyuncs.com/javascripts/horus-0.0.6.min.js](https://bj-qa-test-asset.oss-cn-beijing.aliyuncs.com/javascripts/horus-0.0.6.min.js)


字段 | 类型 | 必填 | 说明 | 用途
--- | --- | --- | --- | ---
alias       | 字符串    |  |    全局别名 | 方便全局调用
url         |字符串     |是 |   服务地址| 上报信息的服务器地址(不能带有\?参数)
project     |字符串     |是 |   不同的项目需要配置不同的项目名称

### 上报数据

```javascript
{
    time: 1504520237556, // ms
    project: "FACEPP-WEB",
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
        domain: 'www.faceplusplus.com.cn',
        version: `Horus/0.1.0`,
        xpath: '',
        title: '标题',
        desc: '这是一段描述'
    }

}
```

### 抓取数据说明

自动抓取范围

* 点击事件
* 链接事件


指定抓取范围

主动上报事件

```javascript

    // 通过 CDN 引入lib的使用方式
    // 变量别名是通过配置的 alias 参数生成 

    $horus.occur('event_name', '这是一段需要被记录的数据')

```

```javascript

    // 通过 import 引入的lib使用方式
    // 假设已经创建了上报对象 const $horus = new Horus({...config})
    $horus.occur('event_name', '这是一段需要被记录的数据')

```

### HTML Support

```html
<div>
    <div ho-hover="EVENT_NAME:TEXT_TITLE" ho-click="EVENT_NAME:TEXT_TITLE">
        <a ho-click="product_compare_try:点击本页“申请测试”按钮">
            <button>这是一段文字</button>
        </a>
        ...other context
    </div>
</div>

```

### React Support

```javascript

    class C extends React.Component {
        render(){
            return <div>
                <div ho-hover="EVENT_NAME:TEXT_TITLE" ho-click="EVENT_NAME:TEXT_TITLE">
                    <a ho-click="product_compare_try:点击本页“申请测试”按钮">
                        <button>这是一段文字</button>
                    </a>
                    {...data}
                </div>
            </div>
        }
    }

```