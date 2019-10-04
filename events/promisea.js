import { EventEmitter } from "events"
import util from 'util'

const PromiseA = function () {
    EventEmitter.call(this)
}

util.inherits(PromiseA, EventEmitter)

PromiseA.prototype.then((onfulfilled, errorHandler, progressHandler) => {
    if (typeof onfulfilled === 'function') {
        this.once('success', onfulfilled)
    }

    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler)
    }

    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler)
    }

    return this
})


const Deferred = function () {
    this.state = 'unfulfilled'
    this.promise = new PromiseA()
}

Deferred.prototype.resolve = function (obj) {
    this.state = 'fulfilled'
    this.promise.emit('success', obj)
}

Deferred.prototype.reject = function (obj) {
    this.state = 'failed'
    this.promise.emit('error', obj)
}

Deferred.prototype.progress = function (obj) {
    this.promise.emit('progress', obj)
}

Deferred.prototype.all = function (promises) {
    const count = promises.length
    const result = []
    promises.forEach((promise, i) => {
        promise.then((data) => {
            count--
            results[i] = data
            if (count === 0) {
                this.resolve(results)
            }
        }, function (err) {
            this.reject(err)
        })
    })

    return this.promise
}

const promisify = function (res) {
    const deferred = new Deferred()
    const result = ''
} 