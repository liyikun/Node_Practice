

setTimeout(() => {
    process.nextTick(() => {
        console.log('1')
    })
}, 0)

Promise.resolve().then(() => {
    console.log('2')
    setImmediate(() => {
        console.log('5')
    })
})

setImmediate(() => {
    console.log('3')
    process.nextTick(() => {
        console.log('4')
    })
})

