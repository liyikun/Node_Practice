Function.prototype.bind2 = function(obj, ...args) {
    let context = obj || window
    let that = this
    let bind = function(...cargs) {
        let isNew = this instanceof bind
        return that.apply(isNew ? this : context,isNew ? cargs : args)
    }
    bind.prototype = this.prototype
    return bind
}

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    this.name = name
    this.age = age
}
var bindFoo = bar.bind2(foo, 'daisy');
bindFoo('18');


var obj = new bindFoo('hahah', '18');

console.log(obj.age);
console.log(obj.name);