function getXPath(element) {
    // 特殊处理返回
    if (element.id !== "") {
        return `//*[@id="${element.id}"]`;
    } else if (element === document.body) {
        return "/html/body";
    }

    var index = 1;
    var str = "";

    Array.prototype.slice
        .call(element.parentNode.childNodes)
        .forEach(function (sibling) {
            if (sibling === element) {
                str = getXPath(element.parentNode);

                // 需要连接符
                if (str) {
                    str += "/";
                }

                str += element.tagName.toLowerCase() + "[" + index + "]";
            } else if (
                sibling.nodeType === 1 &&
                sibling.tagName === element.tagName
            ) {
                index += 1;
            }
        });

    // 如果同级节点只有一个标签, 则去掉索引
    if (index === 1 && str) {
        str = str.substr(0, str.length - 3);
    }

    return str;
}

export default getXPath;
