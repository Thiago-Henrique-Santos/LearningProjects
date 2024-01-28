const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { getEveryone, getByName, getById, register, deletePerson, updatePerson } = require('./controller/PersonController');

const hostname = '127.0.0.1';
const port = 3333;

const server = http.createServer((req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url);
    const parsedQuerystring = querystring.parse(parsedUrl.query);
    const path = parsedUrl.pathname

    if (req.method == 'GET') {
        if (path == "/api/person"){
            getEveryone(req, res);
        } else if (path == "/api/person/resource" && parsedQuerystring.name) {
            const name = parsedQuerystring.name;
            getByName(name, req, res);
        } else if (path.match(/^\/api\/person\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/)) {
            const id = path.split('/')[3];
            getById(id, req, res);
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"error" : "Route not found!"}));
        }
    } else if (req.method == 'POST') {
        switch (path) {
            case "/api/person":
                register(req, res);
                break;
            default:
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({"error" : "Route not found!"}));
                break;
        }
    } else if (req.method == 'DELETE') {
        if (path.match(/^\/api\/person\/([^\/]+)$/)) {
            const id = path.split('/')[3];
            deletePerson(id, req, res);
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({"error" : "Route not found!"}));
        }
    } else if(req.method == 'PUT') {
        switch (path) {
            case "/api/person":
                updatePerson(req, res);
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