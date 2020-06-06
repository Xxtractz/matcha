const mysql = require("mysql");
const dbConfig = require("../config/db.config");

//creating the connectio to the database here
const connection = mysql.createConnection({
    host:dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

//opening the mySql connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;