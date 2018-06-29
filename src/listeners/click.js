import getXPath from "../xpath.js";

function Click(event) {
    let target = event.target;
    let info = pick_info(target);
    return {
        eventName: info.eventName,
        eventType: "click",
        desc: info.text,
        xpath: getXPath(target),
        pageX: event.pageX,
        pageY: event.pageY
    };
}

function pick_info(element) {
    if (element == document.body) {
        return {
            eventName: "",
            text: "click_on_body"
        };
    }

    let mark,
        text = element.innerText.substr(0, 20);

    let testament = findAncestorMark(element);

    if (testament) {
        let r = testament.split(":");
        mark = r[0];
        if (r[1]) text = r[1];
    }
    return {
        eventName: mark,
        text: text
    };
}

function findAncestorMark(src, cnd) {
    let attr;
    while (src && src != document) {
        attr = src.getAttribute("ho:click") || src.getAttribute("ho-click");
        if (attr) return attr;
        src = src.parentNode;
    }
}

export default Click;
