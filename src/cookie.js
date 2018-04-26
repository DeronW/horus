import JSCookie from 'js-cookie'

const ACCOUNT_ID = '__HORUS_ACCOUNT_ID'

function getAID() {
    let aid = JSCookie.get(ACCOUNT_ID)
    if (!aid) {
        aid = 'anonymouse.' + (new Date().getTime() / 1000 + Math.random())
        let host = location.host.split('.')
        let domain = ['*']
        domain[2] = host.pop()
        domain[1] = host.pop()
        JSCookie.set(ACCOUNT_ID, aid, {
            expires: 365 * 7,
            domain: domain.join('.')
        })
    }
    return aid
}

export default {
    getAID
}