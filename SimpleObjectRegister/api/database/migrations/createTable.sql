CREATE DATABASE IF NOT EXISTS SimpleObjectRegister;

CREATE TABLE IF NOT EXISTS person (
    firstname TEXT, 
    lastname TEXT, 
    height REAL,
    weight REAL,
    birthdate DATE
);