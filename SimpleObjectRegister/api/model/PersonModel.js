const { v4: uuidv4 } = require('uuid');
const database = require('../database/connection');
const databaseDirectory = __dirname + '/../database/database.db';

class Person {
    constructor (id, firstName, lastName, birthdate, height, weight) {
        this.id = id || uuidv4();
        this.firstName = firstName || "none";
        this.lastName = lastName || "none";
        this.height = height || 0;
        this.weight = weight || 0;
        this.birthdate = birthdate ? new Date(birthdate) : "none";
    }

    get fullName() {
        const fullName = this.firstName + this.lastName;
        return fullName;
    }

    get age() {
        const currentDate = new Date();

        let age = 0;
        if (currentDate.getMonth()+1 >= this.birthdate.getUTCMonth()+1 && currentDate.getDate() >= this.birthdate.getUTCDate())
            age = currentDate.getYear() - this.birthdate.getYear();
        else
            age = currentDate.getYear() - this.birthdate.getYear() - 1;

        return age;
    }
}

function createPerson(person) {
    return new Promise((resolve, reject) => {
        const newPerson = person;
        let registeredPerson = new Person();

        let sql = "INSERT INTO Person(id, firstName, lastName, weight, height, birthdate) VALUES(?, ?, ?, ?, ?, ?)";
        
        const db = database.open(databaseDirectory);
        const query = db.prepare(sql);
        query.run(newPerson.id, newPerson.firstName, newPerson.lastName, newPerson.weight, newPerson.height, newPerson.birthdate.toJSON().slice(0, 10));
        query.finalize();

        sql = `SELECT * FROM person WHERE id = ?;`;
        db.get(sql, [newPerson.id], (err, row) => {
            if (err) {
                reject(JSON.stringify({message : `Error: ${err.message}`}));
            } else {
                registeredPerson.id = row.id;
                registeredPerson.firstName = row.firstname;
                registeredPerson.lastName = row.lastname;
                registeredPerson.height = row.height;
                registeredPerson.weight = row.weight;
                registeredPerson.birthdate = row.birthdate;
            }

            resolve(registeredPerson);
        });

        database.close(db);
    });
}

function getAll () {
    return new Promise((resolve, reject)=>{
        let data = [];

        const sql = "SELECT * FROM person;";
        const db = database.open(databaseDirectory);
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(JSON.stringify({message : `Erro: ${err.message}`}));
            }

            rows.forEach(row => {
                const id = row.id;
                const firstName = row.firstname;
                const lastName = row.lastname;
                const height = row.height;
                const weight = row.weight;
                const birthdate = row.birthdate;
                data.push(new Person(id, firstName, lastName, birthdate, height, weight));
            });
            
            resolve(data);
        });

        database.close(db);
    });
}

async function getByName (searchingName) {
    return new Promise((resolve, reject)=>{
        let data = [];

        const sql = "SELECT * FROM person WHERE firstname || ' ' || lastname LIKE ?;";
        const db = database.open(databaseDirectory);

        db.all(sql, [`%${searchingName}%`], (err, rows)=>{
            if (err) {
                reject(JSON.stringify({message : `Erro: ${err.message}`}));
            }

            rows.forEach(row => {
                const id = row.id;
                const firstName = row.firstname;
                const lastName = row.lastname;
                const height = row.height;
                const weight = row.weight;
                const birthdate = row.birthdate;
                data.push(new Person(id, firstName, lastName, birthdate, height, weight));
            });
            
            resolve(data);
        })

        database.close(db);
    });
}

async function getById(id) {
    return new Promise((resolve, reject)=>{
        const sql = "SELECT * FROM person WHERE id = ?;";
        const db = database.open(databaseDirectory);
        db.get(sql, [id], (err, row)=>{
            if (err) {
                reject(err);
            }
            resolve(row ? row : `Nenhuma pessoa encontrada com o id ${id}`);
        });
    });
}

async function deletePerson (id) {
    return new Promise ((resolve, reject)=>{
        let sql = "DELETE FROM person WHERE id = ?";
    
        const db = database.open(databaseDirectory);
        const query = db.prepare(sql);
        query.run(id, (err)=>{
            if (err) {
                reject(err);
            }
        });
        query.finalize();
        database.close(db);
        resolve("Pessoa deletada com sucesso!");
    });
}

async function updatePerson (person) {
    return new Promise ((resolve, reject)=>{
        let sql = `UPDATE person SET firstName = ?, lastName = ?, weight = ?, height = ?, birthdate = ? WHERE id = ?`;
    
        const db = database.open(databaseDirectory);
        const query = db.prepare(sql);
        query.run([person.firstName, person.lastName, person.weight, person.height, person.birthdate.toJSON().slice(0, 10), person.id], (err) => {
            if (err) {
                reject(err);
            }
        });
        query.finalize();

        let updatedPerson = new Person();
        sql = "SELECT * FROM person WHERE id = ?;";
        db.get(sql, [person.id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                updatedPerson.id = row.id;
                updatedPerson.firstName = row.firstname;
                updatedPerson.lastName = row.lastname;
                updatedPerson.height = row.height;
                updatedPerson.weight = row.weight;
                updatedPerson.birthdate = row.birthdate;
            }
    
            resolve(updatedPerson);
        });
    
        database.close(db);
    });
}

module.exports = {
    Person,
    getAll,
    getByName,
    getById,
    createPerson,
    deletePerson,
    updatePerson
}