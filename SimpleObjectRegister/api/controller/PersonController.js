const Person = require('../model/PersonModel');

async function getEveryone (req, res) {
    try {
        const everyone = await Person.getAll();        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({everyone}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}

async function register (req, res) {
    try {
        let newPerson = new Person.Person(null, "Yuri", "Moraes", "2010-04-07", 1.50, 78.1);
        newPerson = await Person.createPerson(newPerson);

        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newPerson));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}

module.exports = {
    getEveryone,
    register
}