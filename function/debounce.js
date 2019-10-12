

function Debounce(fun, delay) {
    let timer
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(function() {
            fun.apply(this, args)
        }, delay)
    }
}

function test() {
    var a = 1
}

var run = Debounce(test,1000)


run()
run()
run()
run()

var globalObject = this;
var foo = (() => {
    console.log(this === globalObject)
});
console.log(foo())