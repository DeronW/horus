import './version.js'

import Serialize from './serialize.js'
import {
    Base64
} from 'js-base64'
import request, {
    ImageRequest,
    AjaxRequest
} from './request.js'
import Listeners from './listeners'
import Throttle from './throttle.js'

class Horus {
    constructor(options) {
        this._VERSION = '0.1.0'
        this.opt = Object.assign({
            url: '',
            project: '',
            account_id: '',
            user_id: '', // ??? 接口要求传入的数据
            debug: false,
            request_type: 'auto',
            listen: {
                click: true,
                link: true,
                hover: true,
                history: true,
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

        if (window._FPP_Horus) {
            throw Error('不能重复创建Horus对象')
        }

        window._FPP_Horus = this;

        // 开始监听
        this.ready(this.start.bind(this))
        // this.ready(this.observe.bind(this)) // not ready for this
        // this.overloadWindowFunctions()
        // this.supplement()
    }

    _setOption(k, v) {
        if (this.opt.hasOwnProperty(k)) {
            this.opt[k] = v
        } else {
            console.log(`Horus config: ${k} has been ignored`)
        }
    }

    setConfig(key, value) {
        let options = typeof key === 'object' ? key : {
            [key]: value
        }

        for (let k in options) {
            this._setOption(k, key[k])
        }
    }

    ready(cb) {
        if (document.readyState === 'complete') {
            cb()
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                // document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                cb()
            }, false)
        }
    }

    observe() {
        this.observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                console.log(mutation.target)
                console.log(mutation.addedNodes)
                console.log(mutation.removedNodes)
            });
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

    overloadWindowFunctions() {
        // window.open = function () {
        //     throw Error('TODO')
        // }
        // location.href = function () {
        //     throw Error('TODO')
        // }
    }

    supplement() {
        // supplement last unsuccessed message
    }

    addListener(name, fn) {
        if (!this.listners[name]) throw Error('Horus: 没有这种监听类型');
        this.listners[name].push(fn)
    }

    dispatch(name, event) {
        (this.listners[name] || []).forEach(fn => {
            if (typeof fn === 'function') {
                let data = fn(event)
                data && this.report(Serialize(data, this))
            }
        })
    }

    start() {

        // 点击事件
        if (this.opt.listen.click) {
            document.addEventListener('click', e => this.dispatch('click', e))
        }

        // hover 事件
        if (this.opt.listen.hover) {
            document.addEventListener('mouseover', Throttle(function (e) {
                this.dispatch('hover', e)
            }.bind(this), 300))
        }

        // 链接点击
        if (this.opt.listen.link) {
            document.addEventListener('click', e => this.dispatch('link', e))
        }

        // if (listen.history) {
        //     let wrapper = function (type) {
        //         let orig = history[type]
        //         return function () {
        //             this.inpour('history')(arguments)

        //             var rv = orig.apply(this, arguments)
        //             var e = new Event(type)
        //             e.arguments = arguments
        //             window.dispatchEvent(e)
        //             return rv;
        //         };
        //     }

        //     history.pushState = wrapper('pushState')
        // }
    }

    report(data) {
        let url = this.opt.url;
        if (url.indexOf('?') < 0) url += '?'
        url += '&data=' + (typeof data === 'object' ? Base64.encode(data) : data)
        url += '&_=' + (new Date()).getTime()

        this.requestType == 'image' ?
            ImageRequest(url) :
            AjaxRequest(url)
    }
}


export default Horus