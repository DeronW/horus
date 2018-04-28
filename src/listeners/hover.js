import getXPath from '../xpath.js'

function Hover(event) {
    let go = false,
        target = event.target;
    while (target && target != document) {
        if (target.getAttribute('data-horus')) {
            go = true
            break
        }
        target = target.parentNode
    }
    if (!go) return;

    return {
        event: 'hover',
        title: get_title(event.target),
        desc: get_desc(event.target),
        xpath: getXPath(event.target)
    }
}

function get_title(element) {
    return element.innerText
}

function get_desc(element) {
    return 'TODO'
}

export default Hover