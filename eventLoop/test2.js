var a = new Promise((resolve) => {
    console.log("44")
    resolve()
})

a.then(() => {
    console.log("55")
})

process.nextTick(() => {
    console.log("11")
})

setTimeout(() => {
    console.log("22")
})


setImmediate(() => {
    console.log("33")
})