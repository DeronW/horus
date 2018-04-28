function Debounce(fn, delay = 1000) {
    let timer

    return function (event) {
        clearTimeout(timer)
        timer = setTimeout(function () {
            fn(event)
        }, delay)
    }
}

function Throttle(fn, delay = 1000) {
    let last = 0
    return function (event) {
        let now = new Date().getTime()
        if (now - last > delay) {
            fn(event)
            last = now
        }
    }
}

export default Throttle