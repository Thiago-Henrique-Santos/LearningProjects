const Person = require('../model/PersonModel');

async function getEveryone (req, res) {
    try {
        const everyone = await Person.getEveryone();        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({everyone}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"startStats" : `Reporte o ocorrido! Ocorreu o seguinte erro: ${error}`}));
    }
}

module.exports = {
    getEveryone
}