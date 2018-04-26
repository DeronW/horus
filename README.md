
# Horus

![eye](https://raw.githubusercontent.com/FaceFE/horus/master/images/horus.jpg)

网页统计工具

### requirement

* 网页编码需要采用 utf-8
* 完整支持PC端, 不完整支持移动端
* 需要设置 account_id
* hover 事件比较特殊, 需要手动设置, 只有给元素添加 ``data-horus`` 属性后, 才会记录 hover 事件

* [x] ``click`` 事件, 默认全部监听
* [x] ``hover`` 事件必须绑定监听
* [x] ``link`` 事件, 默认全部监听
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
    if (window[name])
        throw Error('Horus ERROR: name[' + name + '] occupied');
    window['_FPP_Horus_Config'] = config;
    var t = document.createElement("script")
    t.async = 1
    t.src = path
    var tags = document.getElementsByTagName("script")[0]
    tags.parentNode.insertBefore(t, tags)
}("//bj-qa-test-asset.oss-cn-beijing.aliyuncs.com/javascripts/horus-0.0.2.min.js", '__log_server_url__');
</script>
```

### 用法二

```javascript

    import Horus from '@facepp/horus'

    const Eye = new Horus({
        account_id: 'a union identify',
        url: 'where to report event'
    })

    Eye.send('') // 目前受限于后端格式要求, 这里需要指定格式

```

### 配置参数说明

字段 | 类型 | 必填 | 说明 | 用途
--- | --- | --- | --- | ---
alias       | 字符串    |  |    全局别名 | 方便全局调用(仅CDN引入方式下有效)
account_id  |字符串     |   |   客户ID|用于跟踪用户上下文行为, 推荐使用与session id对应的标识
url         |字符串     |是 |   服务地址| 上报信息的服务器地址(不能带有?参数)

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

* 按钮
* 图片
* 链接

### TODO List

默认抓取事件并尝试从上下文中获取当前按钮的说明信息

* 进入页面
* 离开页面
* 停留时间(猜测)

打开 -> 关闭 页面的时间内记录2次动作并估计时间


指定抓取范围

主动上报事件

```javascript

    // 通过 CDN 引入lib的使用方式
    // 变量别名是通过配置的 alias 参数生成 

    $horus.report('special event', '这是一段需要被记录的数据')

```

```javascript

    // 通过 import 引入的lib使用方式
    // 假设已经创建了上报对象 const $horus = new Horus({...config})
    $horus.report('special event', '这是一段需要被记录的数据')

```
