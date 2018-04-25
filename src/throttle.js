function Throttle(fn, delay = 1000){
    let timer

    return function(event){
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn(event)
        }, delay)
    }
}

export default Throttle