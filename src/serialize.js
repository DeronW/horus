import {
    Base64
} from 'js-base64'

function Serialize(data, Horus) {

    let custom = Object.assign({
        domain: location.hostname,
        version: `Horus/${Horus._VERSION}`,
        xpath: '',
        title: '',
        desc: '',
        repeat: 1
    }, data)

    let schema = {
        event: data.event,
        event_id: '',
        project: Horus.opt.project,
        time: (new Date()).getTime(),
        properties: {
            user_brand: '',
            user_explorer: '',
            user_id: Horus.opt.user_id,
            user_model: '',
            user_os: '',
            account_id: Horus.opt.account_id,
        },
        custom: custom
    }

    if (Horus.opt.debug) {
        console.log(schema)
    }

    return Base64.encode(JSON.stringify(schema))
}

export default Serialize