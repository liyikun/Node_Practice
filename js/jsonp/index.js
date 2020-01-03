
const http = require('http')
const fs = require('fs')
const path = require('path')
let readFile = new Promise((reslove, reject) => {
    fs.readFile(path.join(__dirname,'index.html'),(err, html) => {
        if(err) {
            reject(err)
            return
        }
        reslove(html)
    })
})
const server = http.createServer((req, res) => {
    readFile.then(html => {

        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.write(html)
        res.end()
    })
})


server.listen(8080)
console.log('start http server, 8080')



