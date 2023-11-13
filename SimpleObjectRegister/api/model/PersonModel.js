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
        let everyone = [];

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
                everyone.push(new Person(id, firstName, lastName, birthdate, height, weight));
            });
            
            resolve(everyone);
        });

        database.close(db);
    });
}

async function getByName (searchingName) {
    return new Promise((resolve, reject)=>{
        let found = [];

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
                found.push(new Person(id, firstName, lastName, birthdate, height, weight));
            });
            
            resolve(found);
        })

        database.close(db);
    });
}

module.exports = {
    Person,
    getAll,
    getByName,
    createPerson
}