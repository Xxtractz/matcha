const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const poolConnection = mysql.createPool({
  connectionLimit: 50,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: 3306,
});

let matchaDb = {};


matchaDb.insert = (table,data)=>{
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `Insert INTO ${table} SET ?`,
            data,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
}
matchaDb.findById = (table, id) => {
    return new Promise((resolve, reject) => {
        poolConnection.query(
            `SELECT * from ${table} WHERE userid = ?`,
            [id],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            }
        );
    });
};

matchaDb.findByUsername = (table, username) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      `SELECT * from ${table} WHERE username = ?`,
      [username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.saveAuth = (userId, username, token, refreshToken) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "INSERT INTO auth (userid, username, Token, RefreshToken) VALUES (?,?,?,?)",
      [userId, username, token, refreshToken],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.updateAuth = (username, token, refreshToken) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "UPDATE users SET lastseen = ? WHERE username = ?",
      [token, refreshToken, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.addLastSeen = (username, lastSeen) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "UPDATE users SET lastseen = ? WHERE username = ?",
      [lastSeen, username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

matchaDb.removeSession = (username) => {
  return new Promise((resolve, reject) => {
    poolConnection.query(
      "DELETE FROM auth WHERE username = ?",
      [username],
      (err, results) => {
        console.log(results);
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      }
    );
  });
};

module.exports = matchaDb;
//
// let connection;
//
// function handleDisconnect() {
//
//     //creating the connectio to the database here
//     connection = mysql.createConnection({
//         host:dbConfig.HOST,
//         user: dbConfig.USER,
//         password: dbConfig.PASSWORD,
//         database: dbConfig.DB,
//         port: 3306
//     });
//
//     //opening the mySql connection
//     connection.connect(error => {
//         if (error) {
//             console.log('Error when connecting to database:', error);
//             setTimeout(handleDisconnect, 2000);
//         }
//         console.log("Successfully connected to the database.");
//     });
//
//     connection.on('error', (err) => {
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleDisconnect();
//         } else {
//             throw err;
//         }
//     });
// }
//
// handleDisconnect();

// module.exports = connection;
