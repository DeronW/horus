import {
    Base64
} from "js-base64"

function Serialize(schema){
    if(typeof schema == "object") schema = JSON.stringify(schema)
    return Base64.encodeURI(schema)
}

export default Serialize