const http = require('http');
const { getEveryone, register } = require('./controller/PersonController');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    const url = req.url;

    if (req.method == 'GET') {
        switch (url) {
            case "/api/person":
                getEveryone(req, res);
                break;
            default:
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({"error" : "Route not found!"}));
                break;
        }
    } else if (req.method == 'POST') {
        switch (url) {
            case "/api/person":
                register(req, res);
                break;
            default:
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({"error" : "Route not found!"}));
                break;
        }
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"error" : "Route not found!"}));
    }
});

server.listen(port, hostname, ()=>{
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});