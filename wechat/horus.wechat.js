import { Base64 } from "./base64.js";

function Serialize(schema) {
    if (typeof schema == "object") schema = JSON.stringify(schema);
    return Base64.encode(schema);
}

function log() {
    typeof console === "object" && console.log && console.log(...arguments);
}

const USER_ID = "__HORUS_USER_ID";

function randAccounttId() {
    return "wx.anonym." + (new Date().getTime() / 1000 + Math.random());
}

class Horus {
    constructor(options) {
        this.opt = Object.assign(
            {
                url: "",
                project: "Empty",
                accountId: "",
                debug: false
            },
            options
        );

        if (!this.opt.accountId) {
            wx.getStorage({
                key: USER_ID,
                success: res => {
                    this.opt.accountId = res.data;
                },
                fail: () => {
                    let v = randAccounttId();
                    wx.setStorage({
                        key: USER_ID,
                        data: v,
                        success: res => {
                            this.opt.accountId = v;
                        }
                    });
                }
            });
        }
    }

    decorator(event_type, data) {
        let custom = data || {};

        if (typeof custom != "object") custom = { msg: String(data) };

        let schema = {
            time: new Date().getTime(),
            project: this.opt.project,
            event_id:
                new Date().getTime() +
                "-" +
                Math.random()
                    .toString()
                    .substr(2),
            event: event_type,
            properties: Object.assign(
                {
                    cookie: "",
                    account_id: this.opt.accountId,
                    user_id: ""
                },
                {
                    user_brand: "",
                    user_explorer: "Wechat Applet",
                    user_model: "",
                    user_os: ""
                }
            ),
            custom: custom
        };
        // 旧字段, 需要兼容
        if (schema.custom.mark) {
            let t = schema.custom.mark.split(":");
            if (t[0]) schema.event_type = t[0];
        }

        if (this.opt.debug) {
            log("Horus reporting: ", schema);
            log(schema.custom && schema.custom.xpath);
        }
        return schema;
    }

    occur(event_type, data) {
        this._report(event_type, data);
    }

    _report(event_type, data) {
        let url = this.opt.url;
        if (url.indexOf("?") < 0) url += "?";
        url += "&data=" + Serialize(this.decorator(event_type, data));
        url += "&_=" + new Date().getTime();
        wx.request({ url: url });
    }
}

export default Horus;
