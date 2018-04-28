import UAParser from "ua-parser-js"

const UA = new UAParser(navigator.userAgent).getResult()

const Properties = {
    user_brand: UA.device.vendor,
    user_explorer: UA.browser.name + "/" + UA.browser.version,
    user_model: UA.device.model,
    user_os: UA.os.name + "/" + UA.os.version,
}

export default {
    Properties
}