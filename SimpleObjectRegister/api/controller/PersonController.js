const Person = require('../model/PersonModel');

function getEveryone (req, res) {
    try {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"startStats" : "Veja os cadastros!"}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"startStats" : `Reporte o ocorrido! Ocorreu o seguinte erro: ${error}`}));
    }
}

module.exports = {
    getEveryone
}