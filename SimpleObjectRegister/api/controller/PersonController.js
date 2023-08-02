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
        let body = "";
        req.on('data', (chunk)=>{
            body += chunk.toString();
        });
        req.on('end', async ()=>{
            const {firstName, lastName, birthdate, height, weight} = JSON.parse(body);

            console.log("Program in: register() on Controller.");
            
            let newPerson = new Person.Person(null, firstName, lastName, birthdate, height, weight);
            newPerson = await Person.createPerson(newPerson);

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(newPerson));
        });
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}

module.exports = {
    getEveryone,
    register
}