Promise._race = function(Promises) {
    return new Promise((resolve, reject) => {
        Promises.forEach(p => p.then(resolve, reject))
    })
}