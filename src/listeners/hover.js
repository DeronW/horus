import getXPath from "../xpath.js";

function Hover(event) {
    let go = false,
        target = event.target,
        attr;
    while (target && target != document) {
        attr = target.getAttribute("ho:hover") || target.getAttribute("ho-hover");
        if (attr) {
            go = true;
            break;
        }
        target = target.parentNode;
    }
    if (!go) return;

    let a = attr.split(':'),
    eventName = a[0], desc = a[1] || target.innerText.substr(0, 20)

    return {
        eventType: 'hover',
        eventName: eventName,
        desc: desc,
        xpath: getXPath(target)
    };
}

export default Hover;
