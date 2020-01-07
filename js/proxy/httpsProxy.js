"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const net = require("net");
const httpProxy = http.createServer();
let port = 4000;
httpProxy.on('connect', (req, clientSocket, head) => {
    var _a, _b;
    const urlObj = url.parse(`http://${req.url}`);
    console.log(`Connect ${urlObj.hostname}:${urlObj.port}`);
    const options = {
        port: Number(urlObj.port) || 443,
        host: (_b = (_a = urlObj) === null || _a === void 0 ? void 0 : _a.hostname, (_b !== null && _b !== void 0 ? _b : 'localhost'))
    };
    const proxySocket = net.connect(options, () => {
        clientSocket.write('HTTP/1.1 200 Connection Established\r\n' + 'Proxy-agent: BytedMock-Proxy\r\n' + '\r\n');
        proxySocket.write(head);
        proxySocket.pipe(clientSocket);
        clientSocket.pipe(proxySocket);
    });
    proxySocket.on('error', (e) => {
        console.log(e);
    });
});
httpProxy.listen(port, () => {
    console.log(`listen ${port}`);
});
//# sourceMappingURL=httpsProxy.js.map