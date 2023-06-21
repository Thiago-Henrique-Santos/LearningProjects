const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    const url = req.url;

    if (req.method === 'GET') {
        switch (url) {
            case "api/person":
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify('{"startStats" : "Veja os cadastros!"}'));
                break;
        }
    } else if (req.method === 'POST') {
        switch (url) {
            case "api/person":
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify('{"startStats" : "Cadastro realizado com sucesso!"}'));
                break;
        }
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify('{"startStats" : "Rota não encontrada!"}'));
    }
});

server.listen(port, hostname, ()=>{
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});