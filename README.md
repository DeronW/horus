![eye](https://raw.githubusercontent.com/FaceFE/horus/master/images/horus.jpg)

# Horus

微侵入式 网页统计工具

### Installation

1. 下载源码

https://github.com/FaceFE/horus/releases

2. 通过 npm 安装

> npm install @facepp/horus

https://www.npmjs.com/package/@facepp/horus

### Config


```html
<script>
    (function(){
        var config = {
            account_id: '',
            url: ''
        }
        if(typeof _FPP_Horus === 'undefined'){
        } else {
            _FPP_Horus.config()
        }
    })()
</script>
<script src="horus.min.js"></script>
```

```javascript

    import Horus from '@facepp/horus'

    Horus.config({
        account_id: 'a union identify',
        url: 'where to report event',
        debug: false, // default is false
    })

```