Function.prototype.apply2 = function(obj, args) {
    context = obj || window

    let fn = Symbol("fn")

    context[fn] = this

    context[fn](...args)

    delete context[fn]
}
