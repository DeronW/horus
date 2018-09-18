import "./version.js"
import Schema from "./schema.js"
import Serialize from "./serialize.js"
import MakeRequest from "./request.js"

import Listeners from "./listeners"
import Throttle from "./throttle.js"
import Cookie from "./cookie.js"

function log() {
    window["console"].log(...arguments)
}

class Horus {
    constructor(options) {
        this._done = false
        this.opt = Object.assign({
            url: "",
            project: "Empty",
            account_id: Cookie.getAccountID(),
            debug: false,
            noDescribe: true,
            request_type: "auto",
            listen: {
                click: true,
                hover: true,
                history: false,
                scroll: false
            }
        }, options)

        this.listners = {
            click: [Listeners.Click],
            hover: [Listeners.Hover],
            history: [Listeners.History],
            scroll: []
        }
        // then, should call this.start()
    }

    _setOption(k, v) {
        if (this.opt.hasOwnProperty(k)) {
            this.opt[k] = v
        } else {
            log(`Horus config: ${k} has been ignored`)
        }
    }

    setConfig(key, value) {
        let options = typeof key === "object" ? key : {
            [key]: value
        }

        for (let k in options) {
            this._setOption(k, options[k])
        }
    }

    ready(cb) {
        if (document.readyState === "complete") {
            cb()
        } else {
            document.addEventListener("DOMContentLoaded", function () {
                // document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                cb()
            }, false)
        }
    }

    observe() {
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                log(mutation.target)
                log(mutation.addedNodes)
                log(mutation.removedNodes)
            })
        })
        this.observer.observe(document.body, {
            // 监听子节点
            childList: true,
            // 监听 href 属性
            attributes: true,
            // 监听整棵树
            subtree: true
        })
    }

    addListener(name, fn) {
        if (!this.listners[name]) throw Error("Horus: 没有这种监听类型")

        this.listners[name].push(fn)
    }

    dispatch(name, event) {
        (this.listners[name] || []).forEach(fn => {
            if (typeof fn === "function") {
                let data = fn(event)
                data && this._report(data.eventName || name, data)
            }
        })
    }

    // 开始监听
    start() {
        if (this._done) {
            throw Error("Horus 不能重复监听全局事件")
        } else {
            this._done = true
        }

        // 点击事件
        if (this.opt.listen.click) {
            document.addEventListener("click", e => this.dispatch("click", e))
        }

        // hover 事件
        if (this.opt.listen.hover) {
            document.addEventListener("mouseover", Throttle(function (e) {
                this.dispatch("hover", e)
            }.bind(this), 300))
        }

        return this
    }

    decorator(event_type, data) {
        let custom = data || {}
        
        if(typeof(custom) != 'object') 
            custom = {msg: String(data)}

        if(this.opt.noDescribe){
            // tips: custom.desc field usually contain UTF-8 coding
            // this should be caught Base64 encoding error
            delete custom.desc
        }

        let schema = {
            time: new Date().getTime(),
            project: this.opt.project,
            event_id: new Date().getTime() + "-" + Math.random().toString().substr(2),
            event: event_type,
            properties: Object.assign({
                cookie: "",
                account_id: Cookie.getAccountID(),
                user_id: Cookie.geUserID()
            }, Schema.Properties()),
            custom: custom
        }
        // 旧字段, 需要兼容
        if (schema.custom.eventType) schema.event_type = schema.custom.eventType;

        if (this.opt.debug) {
            log("Horus reporting: ", schema)
            log(schema.custom && schema.custom.xpath)
        }
        return schema
    }

    occur(event_type, data) {
        this._report(event_type, data)
    }

    _report(event_type, data) {
        let url = this.opt.url
        if (url.indexOf("?") < 0) url += "?"
        url += "&data=" + Serialize(this.decorator(event_type, data))
        url += "&_=" + (new Date()).getTime()
        MakeRequest(this.request_type, url)
    }
}


export default Horus