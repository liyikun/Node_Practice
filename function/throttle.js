function throttle(fn, delay) {
    let last, deferTimer

    return function(...args) {
        let now = +new Date()
        if(last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                last = now
                fn.apply(this, args)
            }, delay)
        } else {
            last = now
            fn.apply(this, args)
        }

    }
    
}

function test () {
    console.log('test')
}
const a = throttle(test, 1000)

a()
a()
a()
a()
a()
