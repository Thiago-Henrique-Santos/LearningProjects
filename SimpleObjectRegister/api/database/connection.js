const sqlite3 = require('sqlite3').verbose();

exports.open = (database) => {
    database = new sqlite3.Database(database, (err) => {
        if (err) {
            return console.error(err.message);
        }
    });

    return database;
}

exports.close = (database) => {
    database.close((err) => {
        if (err) {
            return console.error(err);
        }
    });
}