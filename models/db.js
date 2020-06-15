const mysql = require("mysql");
const dbConfig = require("../config/db.config");

let connection;

function handleDisconnect() {

    //creating the connectio to the database here
    connection = mysql.createConnection({
        host:dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB,
        port: 3306
    });

    //opening the mySql connection
    connection.connect(error => {
        if (error) {
            console.log('Error when connecting to database:', error);
            setTimeout(handleDisconnect, 2000);
        }
        console.log("Successfully connected to the database.");
    });

    connection.on('error', (err) => {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;