const http = require('http');
const { getEveryone, getByName, register, deletePerson, updatePerson } = require('./controller/PersonController');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res)=>{
    const url = req.url;

    if (req.method == 'GET') {
        if(url == "/api/person"){
            getEveryone(req, res);
        } else if (url.match(/^\/api\/person\/([^\/]+)$/)) {
            const encodedName = url.match(/^\/api\/person\/([^\/]+)$/)[1];
            const decodedName = decodeURIComponent(encodedName);
            getByName(decodedName, req, res);
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"error" : "Route not found!"}));
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
    } else if (req.method == 'DELETE') {
        if (url.match(/^\/api\/person\/([^\/]+)$/)) {
            const id = url.split('/')[3];
            deletePerson(id, req, res);
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"error" : "Route not found!"}));
        }
    } else if(req.method == 'PUT') {
        switch (url) {
            case "/api/person":
                update(req, res);
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