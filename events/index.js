const EventEmitter = require('events');


const emitter = new EventEmitter()

emitter.on("event", function (message) {
    console.log(message)
})

emitter.emit("event", "I am message!")


var proxy = new EventEmitter()

let callback = () => console.log("abc")
let callback2 = () => console.log("abc2")

proxy.once("selected",callback)


proxy.once("selected",callback2)
proxy.once("selected",() => console.log("abc3"))

proxy.emit("selected")