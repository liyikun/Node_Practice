import * as http from 'http';
import * as url from 'url';

const httpProxy = http.createServer();

let port = 4000;

httpProxy.on('request', (req: http.IncomingMessage, res: http.ServerResponse) => {
    let urlObject = url.parse(req.url || '');
    const [hostname, port] = (req.headers.host?.split(':') as [string, number]) || ['localhost', 80];

    const options: http.RequestOptions = {
        protocol: 'http:',
        hostname: hostname, // XXX:PORT
        method: req.method,
        port: port,
        path: urlObject.path,
        headers: req.headers
    };

    console.log(`proxy : ${options.method} : ${options.protocol}//${options.hostname}:${options.port}${options.path}`);

    let requestSearver = http.request(options, (proxyRes) => {
        Object.keys(proxyRes.headers).forEach((key) => {
            res.setHeader(key, proxyRes.headers[key] as any);
        });

        res.writeHead(proxyRes?.statusCode ?? 404);

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
