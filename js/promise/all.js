
Promise._all = function(list) {
    let resValue = []
    let count = 0

    return new Promise((resolve, reject) => {
        list.forEach((p, i) => {
            p.then((res) => {
                count++
                resValue[i] = res
                if(count === list.length) {
                    resolve(resValue)
                }
            }, err => {
                reject(err)
            })
        })
    })
}

var a = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1000)
    }, 1000)
})


var b = new Promise((resolve) => {
    setTimeout(() => {
        resolve(2000)
    }, 1000)
})

Promise.all1([a, b]).then((c) => {
    console.log(c)
})

