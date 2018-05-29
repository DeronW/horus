# 微信小程序埋点功能

使用方法


```javascript

// 在 app.js文件中, 引入埋点功能
import Horus from './utils/horus.wechat.js'

// 创建对象
let horus = new Horus({
    url: 'http://localhost',
    project: 'XXX',
    accountId: '',
    debug: false
})

//  挂载埋点功能到 wx 变量下
App({
    onLaunch: function() {
        //...
        wx.occur = horus.occur.bind(horus)
        //...
    }
});

// 在任意页面中, 触发 wx.occur 方法, 即可发送消息
wx.occur('Event Type', {data: 'Custome data'})

```