import utils from 'util'
import { EventEmitter } from 'events'

function createServer() {
    function app(req, res) {
        app.handle(req, res)
    }
    Object.assign(app, proto)
    Object.assign(app, EventEmitter.prototype)
    app.route = '/'
    app.stack = []
}