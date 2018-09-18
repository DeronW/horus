function Link(event) {
    let go = false,
        target = event.target;
    while (target && target != document) {
        if (target.tagName == 'A' && target.href) {
            go = true;
            break
        }
        target = target.parentNode
    }
    if(!go) return;

    event.preventDefault()
    setTimeout(()=>{
        window.open(target.href, target.target || '_self')
    }, 300)

    return {
        event: 'link',
        title: get_title(event.target),
        desc: get_desc(event.target),
        xpath: get_xpath(event.target)
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
    let t = element.innerText || '';
    let e = element.getAttribute('data-horus');
    if (e) {
        return e
    }
    return t.substr(0, 10)
}

export default Link
