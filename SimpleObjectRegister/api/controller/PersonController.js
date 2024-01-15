const Person = require('../model/PersonModel');

async function getEveryone (req, res) {
    try {
        const data = await Person.getAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({data}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}

async function getByName (name, req, res) {
    try {
        const data = await Person.getByName(name);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({data}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}

async function getById (id, req, res) {
    try {
        const data = await Person.getById(id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({data}));
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

async function deletePerson (id, req, res) {
    try {
        const deleteMessage = await Person.deletePerson(id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({deleteMessage}));
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}

async function updatePerson (req, res) {
    try {
        let body = "";
        req.on('data', (chunk)=>{
            body += chunk.toString();
        });
        req.on('end', async ()=>{
            const {id, firstName, lastName, birthdate, height, weight} = JSON.parse(body);
            let updatedPerson = new Person.Person(id, firstName, lastName, birthdate, height, weight);
            updatedPerson = await Person.updatePerson(updatedPerson);

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(updatedPerson));
        });
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message : `Ocorreu o seguinte erro: ${error}`}));
    }
}


module.exports = {
    getEveryone,
    getByName,
    getById,
    register,
    deletePerson,
    updatePerson
}