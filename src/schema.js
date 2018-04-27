import UAParser from 'ua-parser-js'

const UA = new UAParser(navigator.userAgent).getResult()

const PROPERTIES = {
    user_brand: UA.device.vendor,
    user_explorer: UA.browser.name + '/' + UA.browser.version,
    user_model: UA.device.model,
    user_os: UA.os.name + '/' + UA.os.version,
}

window._DD = UA

function SchemaWrapper(data, Horus) {

    let custom = Object.assign({
        domain: location.hostname,
        version: `Horus/${Horus._VERSION}`,
        xpath: '',
        title: '',
        desc: ''
    }, data)

    let properties = Object.assign({
        cookie: document.cookie,
        user_id: '',
        account_id: Horus.opt.account_id,
    }, PROPERTIES)

    let schema = {
        event: data.event,
        event_id: '',
        project: 'Horus',
        time: (new Date()).getTime(),
        properties: properties,
        custom: custom
    }

    if (Horus.opt.debug) {
        console.log('Horus reporting: ', schema)
    }

    return schema
}

export {
    SchemaWrapper
}