function Click(event) {
    return {
        event: 'click',
        title: get_title(event.target),
        desc: get_desc(event.target),
        xpath: get_xpath(event.target),
        pageX: event.pageX,
        pageY: event.pageY
    }
}

function get_title(element) {
    if (element == document.body)
        return 'pointless click';
    return pick_text(element)
}

function get_desc(element) {
    if (element == document.body)
        return '点击在了空白区域';

    return ''
}

function get_xpath() {
    return 'TODO'
}

function pick_text(element) {
    let t = element.innerText;
    let e = element.getAttribute('data-horus');
    if (e) {
        return e
    }
    return t.substr(0, 10)
}

export default Click