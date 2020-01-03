"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const httpProxy = http.createServer();
let port = 4000;
httpProxy.on('request', (req, res) => {
    var _a;
    let urlObject = url.parse(req.url || '');
    const [hostname, port] = ((_a = req.headers.host) === null || _a === void 0 ? void 0 : _a.split(':')) || ['localhost', 80];
    const options = {
        protocol: 'http:',
        hostname: hostname,
        method: req.method,
        port: port,
        path: urlObject.path,
        headers: req.headers
    };
    console.log(`proxy : ${options.method} : ${options.protocol}//${options.hostname}:${options.port}${options.path}`);
    let requestSearver = http.request(options, (proxyRes) => {
        var _a, _b;
        Object.keys(proxyRes.headers).forEach((key) => {
            res.setHeader(key, proxyRes.headers[key]);
        });
        res.writeHead((_b = (_a = proxyRes) === null || _a === void 0 ? void 0 : _a.statusCode, (_b !== null && _b !== void 0 ? _b : 404)));
        proxyRes.pipe(res);
    });
    req.pipe(requestSearver);
    requestSearver.on('error', (e) => {
        console.error(e);
    });
});
httpProxy.listen(port, () => {
    console.log(`listen ${port}`);
});
//# sourceMappingURL=httpProxy.js.map