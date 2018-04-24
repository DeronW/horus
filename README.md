
# Horus

![eye](https://raw.githubusercontent.com/FaceFE/horus/master/images/horus.jpg)

微侵入式 网页统计工具

## Installation

* 下载生产环境代码 (推荐下载当前最新版本)

https://github.com/FaceFE/horus/releases

* 通过 npm 安装

> npm install @facepp/horus

https://www.npmjs.com/package/@facepp/horus


### 用法一

```html
<script>
!function (path, config) {
    if (window[name])
        throw Error('Horus ERROR: name[' + name + '] has been occupied');
    window['_FPP_Horus_Config'] = config;
    var t = document.createElement("script")
    t.async = 1
    t.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + path
    var tags = document.getElementsByTagName("script")[0]
    tags.parentNode.insertBefore(t, tags)
}("assets.growingio.com/2.1/gio.js", {
    alias: '$horus',
    account_id: '...',
    url: '__required__'
});
</script>
```

### 用法二

```javascript

    import Horus from '@facepp/horus'

    const Eye = new Horus({
        account_id: 'a union identify',
        url: 'where to report event'
    })

    Eye.send('')

```

### 配置参数说明

字段 | 类型 | 必填 | 说明 | 用途
- | :-: | -: | - | -
alias       | 字符串    |  |    全局别名 | 方便全局调用
account_id  |字符串     |   |   客户ID|用于跟踪用户上下文行为, 推荐使用与session id对应的标识
url         |字符串     |是 |   服务地址| 上报信息的服务器地址(不能带有?参数)
extra       |json       |   |   额外标记|扩展信息, 某些情况下传入日志服务的特殊信息
sendComplete|function   |   |   完成回掉|发送完统计数据之后的回掉

### 上报数据

```javascript
    {
        "timestamp": 1524559613,
        "domain": "www.faceplusplus.com",
        "path": "/financial-solution/",
        "account_id": "...",
        "extra_data": "...",
        "event": "open|close|click|link|hover|state",
        "info": {
            "xpath": "/html/body/div/div[2]/div/div[2]/div/section/pre/code",
            "title": "...",
            // etc...
        }
    }
```

### 抓取数据说明

自动抓取范围

* 按钮
* 图片
* 链接

默认抓取事件并尝试从上下文中获取当前按钮的说明信息

* 进入页面
* 离开页面
* 停留时间(猜测)

打开 -> 关闭 页面的时间内记录2次动作并估计时间

指定抓取范围

给人以元素设置 ``ho-click`` , ``ho-hover`` 属性, 然后会监听该元素的对应事件

主动上报事件

```javascript

    // 通过 CDN 引入lib的使用方式
    // 变量别名是通过配置的 alias 参数生成 

    $horus.report('special event', '这是一段需要被记录的数据')

```

```javascript

    // 通过 import 引入的lib使用方式
    // 假设已经创建了上报对象 const $horus = new Horus({...config})
    $horus.report('special event', '这是一段需要被记录的数据')

```