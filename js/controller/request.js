

function fetchAll(urls, limit) {
    let handle = (url) => {
        return new Promise((resolve,reject) => {
            let time = Math.random() * 1000
            console.log(`fetch: ${url} start`)
            setTimeout(() => {
                console.log(`fetch: ${url} success`, time)
                resolve('')
            }, time)
        })
    }

    let run = (arr) => {
        return handle(arr.shift()).then(() => {
            if(arr.length > 0) {
                return run(arr)
            } else {
                return 'finish'
            }
        })
    }

    let copyList = [...urls]
    let runlist = []

    while(limit--) {
        runlist.push(run(copyList))
    }

    return Promise.all(runlist)
}


fetchAll(['1','2','3','4','5','6','7','8'],3)