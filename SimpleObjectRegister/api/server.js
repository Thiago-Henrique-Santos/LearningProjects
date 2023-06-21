const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify('{"startStats" : "Server on"}'));
});

server.listen(port, hostname, ()=>{
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});