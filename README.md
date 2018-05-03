
# Horus

![eye](https://raw.githubusercontent.com/HonourFE/horus/master/images/horus.jpg)

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
* [ ] ``link`` 事件, no plan
* [ ] ``scroll`` 事件, TODO
* [ ] 业务流程 事件, TODO
* [ ] React 的支持, TODO
* [ ] Vue 的支持, TODO

## Installation

* 下载生产环境代码 (推荐下载当前最新版本)

https://unpkg.com/@honour/horus@0.1.6/dist/horus.min.js

* 通过 npm 安装

> npm install @honour/horus

https://www.npmjs.com/package/@honour/horus


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

    import Horus from '@honour/horus'

    const $horus = new Horus({
        project: '__PROJECT_NAME__',
        url: '__REPORT_TO__'
    })
    // 如果需要打开自动监听, 需要打开一下方法
    // $horus.start()

    horus.occur('__EVENT_TYPE__', '__JSON_DATA__')

```

### 配置参数说明

字段 | 类型 | 说明 | 用途
--- | --- | --- | ---
alias       | 字符串    |   全局别名 | 方便全局调用
url (必填)         |字符串     |   服务地址| 上报信息的服务器地址(不能带有\?参数)
project (必填)    |字符串     |  不同的项目需要配置不同的项目名称

### 上报数据

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

### 抓取数据说明

#### 自动抓取范围

* 点击事件

#### 主动上报事件

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

``event_name`` 的详细内容参考底部 "事件类型"

#### 指定抓取范围

核心思路: 在最终渲染(无论是SSR还是SPA,最终都会生成HTML的结构)的内容中, 没有能够明确区分每个元素的标记. 所以, 精细的统计功能需要通过给目标元素添加特殊标记来实现.

**标记说明**

目前支持2种标记方式, 均为在HTML中添加特殊属性

通用格式:

```html

    <div 
        ho-click="事件类型:说明文字"
        ho-hover="事件类型:说明文字"
    >
        <!-- fragment -->
    </div>

```

* 事件类型: 的详细内容参考底部 "事件类型"
* 说明文字: 附加说明, 可以不填

* ho-click: 监听点击事件
* ho-hover: 监听鼠标移入事件(很短时间内只会触发一次, 鼠标快速滑动经过的位置会被忽略)

例子:

```html
<div>
    <div 
        ho-hover="solution_login_hover:鼠标移动到“刷脸登录”的hover状态" 
        ho-click="financial_contact_top"> <!-- 只有事件名称, 描述可以为空 -->
        <a 
            ho-click="product_compare_try:点击本页“申请测试”按钮">
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
                <div 
                    ho-hover="EVENT_NAME:TEXT_TITLE" 
                    ho-click="EVENT_NAME:TEXT_TITLE">
                    <a 
                        ho-click="product_compare_try:点击本页“申请测试”按钮">
                        <button>这是一段文字</button>
                    </a>
                    {...data}
                </div>
            </div>
        }
    }

```

### Vue Support

TODO:


## 参考


事件类型 的值参考 [Wiki](https://wiki.megvii-inc.com/pages/viewpage.action?pageId=16974900)
