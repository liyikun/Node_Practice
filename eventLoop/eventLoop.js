/** @type {NodeJS} */

console.log('2333')

process.nextTick(() => {
    console.log("1")
})

setImmediate(() => {
    console.log("5")
})

var a = new Promise((resolve) => {
    resolve(console.log("3"))
})

Promise.resolve(console.log("4"))

setTimeout(() => {
    console.log("2")
}, 0)


console.log("6")

setTimeout(() => {
    Promise.resolve(console.log("8"))
    Promise.resolve().then(_ => {
        console.log('9')
    }).then(_ => {
        Promise.resolve().then(_ => {
            console.log('10')
        })
    })
}, 0)


a.then(() => {
    console.log("7")
    Promise.resolve().then(_ => {
        console.log('before timeout')
    }).then(_ => {
        Promise.resolve().then(_ => {
            console.log('also before timeout')
        })
    })
})


