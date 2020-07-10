const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const poolConnection = mysql.createPool({
    connectionLimit: 1000,
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: 3306,
});

let matchaDb = {};