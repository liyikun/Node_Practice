

Function.prototype.call2 = function(obj, ...args) {
    context = obj || window

    let fn = Symbol("fn")

    context[fn] = this

    context[fn](...args)

    delete context[fn]
}


function aa(...arg) {
    console.log(this, arg)
}

var b = {
    a: 1
}

aa.call2(b, 1,2,3)

console.log(aa)