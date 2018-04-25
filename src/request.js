function AjaxRequest(url) {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)

    return new Promise((resolve, reject) => {
        xhr.onload = function () {
            xhr.status < 300 ? resolve() : reject()
        }
        xhr.send()
    })
}

function ImageRequest(url) {
    let img = document.createElement('img')
    img.style.display = 'none';

    return new Promise((resolve, reject) => {
        img.onload = function () {
            document.body.removeChild(img)
            resolve()
        }
        img.src = url
        document.body.appendChild(img)
    })
}

export {
    ImageRequest,
    AjaxRequest
}