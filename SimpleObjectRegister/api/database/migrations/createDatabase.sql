CREATE DATABASE IF NOT EXISTS SimpleObjectRegister;

CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fisrtName VARCHAR(20), 
    lastName VARCHAR(20), 
    height FLOAT,
    weight FLOAT,
    birthdate DATE
);