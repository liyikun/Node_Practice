


class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(key, cb) {
        if(this.events[key]) {
            this.events[key].push(cb)
        } else {
            this.events[key] = [cb]
        }
    }
    once(key, cb) {
        let run = (...args) => {
            this.delete(key)
            cb(...args)
        }
        if(this.events[key]) {
            this.events[key].push(run)
        } else {
            this.events[key] = [run]
        }
    }
    emit(key, ...args) {
        this.events[key] && this.events[key].forEach((cb) => cb(...args))
    }
    delete(key) {
        if(this.events[key]) {
            delete this.events[key]
        }
    }
}

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