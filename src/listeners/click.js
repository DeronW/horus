import getXPath from '../xpath.js'

function Click(event) {
    let target = event.target

    let info = pick_info(event.target)

    return {
        mark: info.mark,
        desc: info.text,
        xpath: getXPath(event.target),
        pageX: event.pageX,
        pageY: event.pageY
    }
}

function pick_info(element) {
    if (element == document.body) {
        return {
            mark: 'click:body',
            text: 'pointless click'
        }
    }

    let mark, text = element.innerText.substr(0, 20)
    let testament = findAncestorMark(element)
    if (testament) {
        let r = testament.split(':')
        mark = r[0]
        if (r[1]) text = r[1]
    }
    return {
        mark: 'click' + (mark ? ':' + mark : ''),
        text: text
    }
}

function findAncestorMark(src, cnd) {
    while (src && src != document) {
        let mark = src.getAttribute('ho:click')
        if (!mark) src.getAttribute('ho-click')
        if (mark) return mark
        src = src.parentNode
    }
}

export default Click