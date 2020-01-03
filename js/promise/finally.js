Promise.prototype.finally1 = function (callback) {
    console.log(this)
    return this.then(
        value => Promise.resolve(callback()).then(() => value),
        reason => Promise.resolve(callback()).then(() => { throw reason })
    );
};
