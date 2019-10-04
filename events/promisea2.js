

const PromiseA = function () {
    this.queue = []
    this.isPromise = true
}

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    let handler = {}

    if(typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler
    }

    if(typeof errorHandler === 'function') {
        handler.error = errorHandler
    }

    this.queue.push(handler)

    return this
}

const Deferred = function() {
    this.promise = new PromiseA()
}

Deferred.prototype.resolve = function(obj) {
    let handler
    while(handler = this.promise.queue.shift()) {
        if(handler && handler.fulfilled) {
            let ret = handler.fulfilled(obj)
            if(ret && ret.isPromise) {
                ret.queue = this.promise.queue
                this.promise = ret
            }
        }
    }
}