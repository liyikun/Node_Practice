import * as http from 'http';
import * as url from 'url';
import * as net from 'net';

const httpProxy = http.createServer();

let port = 4000;

httpProxy.on('connect', (req: http.IncomingMessage, clientSocket: net.Socket, head: Buffer) => {
    const urlObj = url.parse(`http://${req.url}`);

    console.log(`Connect ${urlObj.hostname}:${urlObj.port}`);

    const options: net.TcpSocketConnectOpts = {
        port: Number(urlObj.port) || 443,
        host: urlObj?.hostname ?? 'localhost'
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
