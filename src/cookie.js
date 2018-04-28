import JSCookie from "js-cookie"

const USER_ID = "__HORUS_USER_ID"

function geUserID() {
    let uid = JSCookie.get(USER_ID)
    if (!uid) {
        uid = "anonymouse." + (new Date().getTime() / 1000 + Math.random())
        let host = location.host.split(".")
        let domain = ["*"]
        domain[2] = host.pop()
        domain[1] = host.pop()
        JSCookie.set(USER_ID, uid, {
            expires: 365 * 7,
            domain: domain.join(".")
        })
    }
    return uid
}

function getAccountID() {
    return JSCookie.get("account_id")
}

export default {
    geUserID,
    getAccountID
}