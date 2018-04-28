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
            // project: "",
            account_id: Cookie.getAccountID(),
            debug: false,
            request_type: "auto",
            listen: {
                click: true,
                link: false,
                hover: true,
                history: false,
                scroll: false
            }
        }, options)

        this.listners = {
            click: [Listeners.Click],
            link: [Listeners.Link],
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
            this._setOption(k, key[k])
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
                data && this._report(name, data)
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

        // 链接点击
        // if (this.opt.listen.link) {
        //     document.addEventListener("click", e => this.dispatch("link", e))
        // }
        return this
    }

    decorator(event_type, data) {
        for (let i in data)
            data[i] = escape(data[i])

        let schema = {
            time: new Date().getTime(),
            project: this.opt.project,
            event_id: new Date().getTime() + "-" + Math.random().toString().substr(2),
            event: event_type,
            properties: Object.assign({
                cookie: "",
                account_id: Cookie.getAccountID(),
                user_id: Cookie.geUserID()
            }, Schema.Properties),
            custom: data
        }


        if (this.opt.debug) {
            log("Horus reporting: ", schema)
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