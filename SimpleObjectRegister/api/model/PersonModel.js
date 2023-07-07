const database = require('../database/connection');

class Person {
    constructor (id, firstName, lastName, birthdate, height, weight) {
        this.id = id || 0;
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

function register(firstName, lastName, weight, height, birthdate) {
    return new Promise((resolve, reject) => {
        let registeredPerson = new Person();
        let registeredPersonId = 0;

        const sql = "INSERT INTO Person(firstName, lastName, weight, height, birthdate) VALUES(?, ?, ?, ?, ?)";
        
        const db = database.open('./database/database.db');
        const query = db.prepare(sql);
        query.run(firstName, lastName, weight, height, birthdate, function(err){
            if (err) {
                reject(JSON.stringify({message : `Erro: ${err.message}`}));
            } else {
                registeredPersonId = this.id;
            }
        });
        query.finalize();

        sql = `SELECT * FROM person WHERE id = ${registeredPersonId};`;
        db.get(sql, [registeredPersonId], (err, row) => {
            if (err) {
                reject(JSON.stringify({message : `Erro: ${err.message}`}));
            } else {
                registeredPerson.id = row.id;
                registeredPerson.firstName = row.firstPerson;
                registeredPerson.lastName = row.lastName;
                registeredPerson.height = row.height;
                registeredPerson.weight = row.weight;
                registeredPerson.birthdate = new Date(row.birthdate);
            }
        });
        database.close(db);

        resolve(registeredPerson);
    });
}

function getEveryone () {
    return new Promise((resolve, reject)=>{
        let everyone = [];

        const sql = "SELECT rowid, * FROM person;";

        const databaseDirectory = __dirname + '/../database/database.db';
        const db = database.open(databaseDirectory);
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(JSON.stringify({message : `Erro: ${err.message}`}));
            }

            rows.forEach(row => {
                const id = row.rowid;
                const firstName = row.firstName;
                const lastName = row.lastName;
                const height = row.height;
                const weight = row.weight;
                const birthdate = row.birthdate;
                everyone.push(new Person(id, firstName, lastName, height, weight, birthdate));
            });
            
            resolve(everyone);
        });

        database.close(db);
    });
}

module.exports = {
    Person,
    getEveryone,
    register
}